import { get } from '@ember/object';
import { Hub } from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import Service, { inject as service } from '@ember/service';
import CognitoUser from '../utils/cognito-user';

/**
 * You can extend and override this behaviour by creating your own `aws-amplify-auth-service` in your
 * `app/services` directory.
 */
export default Service.extend({

  /**
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Experimental
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Part of AWS Amplify Hub listening to events on the Auth channel.  Currently does nothing.
   */
  afterConfigured() {
    // override accordingly
  },

  /**
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Experimental
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Part of AWS Amplify Hub listening to events on the Auth channel.  Currently does nothing.
   */
  afterSignIn() {
    // override accordingly
  },

  /**
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Experimental
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Part of AWS Amplify Hub listening to events on the Auth channel.  Currently does nothing.
   */
  afterSignInFailure() {
    // override accordingly
  },

  /**
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Experimental
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Part of AWS Amplify Hub listening to events on the Auth channel.  Currently does nothing.
   */
  afterSignOut() {
    // override accordingly
  },

  /**
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Experimental
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Part of AWS Amplify Hub listening to events on the Auth channel.  Currently does nothing.
   */
  afterSignUp() {
    // override accordingly
  },

  currentAuthenticatedUser(refreshTask) {
    return Auth.currentAuthenticatedUser()
      .then(response => this._handleSuccessfulAuthentication(response, refreshTask));
  },

  configuration: service('ember-simple-auth-aws-amplify.configuration'),

  init() {
    this._super(...arguments);
    Hub.listen('auth', this);
    Auth.configure(this.get('configuration.awsAmplifyAuthConfig'));
  },

  /**
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Experimental
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   *
   * I'm just testing out the events that Amplify provides through Hub.  This may or may not disappear in the future.
   *
   * @param capsule
   * @see https://aws-amplify.github.io/docs/js/authentication#subscribing-events
   * @see https://aws-amplify.github.io/docs/js/hub#listening-authentication-events
   */
  onHubCapsule(capsule) {
    switch (capsule.payload.event) {
      case 'configured':
        this.afterConfigured();
        break;
      case 'signIn':
        this.afterSignIn();
        break;
      case 'signIn_failure':
        this.afterSignInFailure();
        break;
      case 'signOut':
        this.afterSignOut();
        break;
      case 'signUp':
        this.afterSignUp();
        break;
      default:
        console.warn(`AWS Amplify Hub - AUTH Event -> '${capsule.payload.event}' was ignored in authenticator/aws-amplify-auth.js`);
    }
  },

  signIn(username, password, refreshTask) {
    return Auth.signIn(username, password)
      .then(response => this._handleSuccessfulAuthentication(response, refreshTask));
  },

  signOut(refreshTask) {
    return Auth.signOut()
      .then(() => refreshTask.cancelAll());
  },

  signUp(username, password, attributesHash, [validationData]) {
    return Auth.signUp({
      username,
      password,
      attributes: attributesHash,
      validationData: validationData
    });
  },

  _handleSuccessfulAuthentication(response, refreshTask) {
    refreshTask.cancelAll();
    refreshTask.perform(get(response, 'signInUserSession.accessToken.payload.exp'));
    return { cognitoUser: new CognitoUser(response) };
  }
});
