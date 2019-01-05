import { inject as service } from '@ember/service';
import { merge } from '@ember/polyfills';
import { task, timeout } from 'ember-concurrency';
import { getOwner } from '@ember/application';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

export default BaseAuthenticator.extend({

  authenticate() {
    return this._refreshUser();
  },

  awsAmplify: service('aws-amplify.auth'),

  /**
   * Takes no arguments.
   * @return {Promise<any> | *}
   */
  invalidate(/*data*/) {
    return this.get('awsAmplify.auth')
      .signOut()
      .then(() => {
        this.get('_refreshAccessTokenTask').cancelAll();
      });
  },

  /**
   * Takes no arguments.
   * @return {Promise< | any> | *}
   */
  restore(/*data*/) {
    return this._refreshUser();
  },

  /* Private
   * ---------------------------------------------------------------------------------------------------------------- */

  /**
   * This is an ember-concurrency task that waits until access token expiry and then fires
   * a restore on the session (just like in `ember-simple-auth/addon/initializers/setup-session-restoration.js`).
   */
  _refreshAccessTokenTask: task(function* (exp) {
    const wait = exp * 1000 - Date.now();
    console.warn('Scheduled token refresh will occur at ', new Date(exp * 1000));

    yield timeout(wait);

    console.warn('Commencing refresh of the access token at ', new Date());
    return getOwner(this).lookup('session:main').restore();
  }),

  /**
   * Grab the current authenticated user from AWS Cognito authentication server directly; do not use cache.
   * Merge the attributes, idPayload, accessPayload, and preferredMFA into a hash that is returned from the success
   * side of the returned promise.
   *
   * Setup a ember-concurrency timed task that will refresh the current user from AWS Cognito automatically in
   * the background.
   *
   * @return {PromiseLike<T | never> | Promise<T | never>}
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
