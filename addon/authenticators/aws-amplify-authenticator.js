import { inject as service } from '@ember/service';
import { merge } from '@ember/polyfills';
import { task, timeout } from 'ember-concurrency';
import { getOwner } from '@ember/application';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

/**
 * An implementation of `ember-simple-auth` Authenticator.
 *
 * Guess what?  You won't ever invoke the `authenticate()` function.  You'll instead use
 * the `session`'s `signIn(...)` and `confirmSignIn(...)` functions.
 */
export default BaseAuthenticator.extend({

  /**
   * Implementation of the `authenticate` method is dead simple; ask AWS Amplify's `Auth` to
   * reach out to AWS Cognito User Pool and grab the `currentAuthenticatedUser(...)` which returns a
   * `CognitoUser` instance.  User details are then returned from the success-side of this request
   * for the `currentAuthenticatedUser(...)`.
   *
   * This might seem odd, where's the user's credentials and all that jazz?  Because of MFA we can't
   * use the `authenticate()` method as we have in other _auth_ implementations.  As such the
   * `session` service has a `signIn(...)` and `confirmSignIn(...)` function.
   *
   * If simple single-factor authentication is configured for the user, that will be detected
   * by the `signIn(...)` function and simply invoke this `authenticate()` call automatically.  Should
   * multi-factor authentication be detected during the `signIn(...)`, this `authenticate()` function
   * will be called once the user provides the appropriate passcode to the `confirmSignIn(...)` function
   * of the `session`.
   *
   * When `authenticate()` is called, it should be noted that an `ember-concurrency` timed task is created
   * that will refresh the session's token according to the `exp` value that was returned with the access token
   * payload.
   *
   * @return {Promise<any>} the promise from #_refreshUser
   */
  authenticate() {
    return this._refreshUser();
  },

  /**
   * A singleton service that provides universal access to AWS Amplify's `Auth` instance.
   */
  awsAmplify: service('aws-amplify.auth'),

  /**
   * Takes no arguments.
   *
   * AWS Amplify's `Auth.signOut()` is called to destroy the session in the AWS Cognito Pool.  The browser's
   * local storage is purged of all of the session data that was stored by AWS Amplify.
   *
   * The `ember-concurrency` task that was refreshing the access token periodically will be
   * cancelled.
   *
   * @return {Promise<any>}
   * @see https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#signout
   */
  invalidate(/*data*/) {
    return this.get('awsAmplify.auth')
      .signOut()
      .finally(() => this.get('_refreshAccessTokenTask').cancelAll());
  },

  /**
   * Similar to `authenticate()` we let AWS Amplify's `Auth` instance do all the heavy lifting here.
   * The `CognitoUser` instance will be summoned by a call to the `currentAuthenticatedUser(...)`.  The
   * resulting information will be placed into local storage and returned to the `session.data.authenticated`
   * property storage.
   *
   * @return {Promise<any>} the promise from #_refreshUser
   */
  restore(/*data*/) {
    return this._refreshUser();
  },

  /* Private
   * ---------------------------------------------------------------------------------------------------------------- */

  /**
   * This is an `ember-concurrency` task that waits until access token expiry before triggering
   * a `getOwner(this).lookup('session:main').restore()` on the session.  I saw this technique being
   * employed in `ember-simple-auth/addon/initializers/setup-session-restoration.js`.
   *
   * The reason I needed to do this was so that the `restore()` invocation actually altered and replaced
   * the `session.data.authenticated` information.  Simply calling `this.restore()` does not do what I require.
   * I am a bit of a dummy though.
   *
   * @private
   */
  _refreshAccessTokenTask: task(function* (exp) {
    const wait = exp * 1000 - Date.now();
    console.warn('Scheduled token refresh will occur at ', new Date(exp * 1000));

    yield timeout(wait);

    console.warn('Commencing refresh of the access token at ', new Date());
    return getOwner(this).lookup('session:main').restore();   // TODO: try this.restore()?  trigger restore events?
  }),

  /**
   * Grab the current authenticated user from AWS Cognito authentication server directly; do not use any
   * cached information in local storage/cookie.  Merge the attributes, idPayload, accessPayload,
   * and preferredMFA into a hash that is returned from the success side of the returned promise.
   *
   * Setup a ember-concurrency timed task that will refresh the current user from AWS Cognito automatically in
   * the background.
   *
   * @return {Promise<any>} the processed `CognitoUser` information turned into a hash that will be written
   * to the `session.data.authenticated` property storage.
   * @private
   */
  _refreshUser() {
    return this.get('awsAmplify.auth')
      .currentAuthenticatedUser({ bypassCache: true })
      .then(cognitoUser => {
        this.get('_refreshAccessTokenTask').cancelAll();
        this.get('_refreshAccessTokenTask').perform(cognitoUser.signInUserSession.accessToken.payload.exp);
        const data = merge({ accessPayload: cognitoUser.signInUserSession.accessToken.payload }, { accessToken: cognitoUser.signInUserSession.accessToken.jwtToken });
        merge(data, { attributes: cognitoUser.attributes });
        merge(data, { idPayload: cognitoUser.signInUserSession.idToken.payload });
        merge(data, { idToken: cognitoUser.signInUserSession.idToken.jwtToken });
        merge(data, { preferredMFA: cognitoUser.preferredMFA });
        return data;
      });
  }
});
