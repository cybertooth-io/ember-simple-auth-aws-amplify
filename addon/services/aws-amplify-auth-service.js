import { get } from '@ember/object';
import { Hub } from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import Service, { inject as service } from '@ember/service';
import CognitoUserProxy from '../utils/cognito-user';

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

  /**
   * @param oldPassword
   * @param newPassword
   * @return {Promise<"SUCCESS">}
   * @see https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#changepassword
   */
  changePassword(oldPassword, newPassword) {
    // TODO: process errors: https://github.com/cybertooth-io/ember-simple-auth-aws-amplify/issues/10
    return Auth.changePassword(this.get('cognitoUser'), oldPassword, newPassword);
  },

  /**
   * This property is used when updating the current signed in user; e.g. `Auth.changePassword(...)`.
   * This `cognitoUser` property will be set on successful sign-in/refresh and will be cleared on
   * successful sign-out.
   */
  cognitoUser: undefined,

  configuration: service('ember-simple-auth-aws-amplify.configuration'),

  currentAuthenticatedUser(refreshTask) {
    return Auth.currentAuthenticatedUser()
      .then(response => this._handleSuccessfulAuthentication(response, refreshTask));
  },

  /**
   * @param username
   * @return {Promise<any>}
   * @see https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#forgotpassword
   */
  forgotPassword(username) {
    // TODO: process errors: https://github.com/cybertooth-io/ember-simple-auth-aws-amplify/issues/10
    return Auth.forgotPassword(username);
  },

  /**
   * @param username
   * @param code
   * @param password
   * @return {Promise<void>}
   * @see https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#forgotpasswordsubmit
   */
  forgotPasswordSubmit(username, code, password) {
    // TODO: process errors: https://github.com/cybertooth-io/ember-simple-auth-aws-amplify/issues/10
    return Auth.forgotPasswordSubmit(username, code, password);
  },

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

  resendSignUp(username) {
    // TODO: process errors: https://github.com/cybertooth-io/ember-simple-auth-aws-amplify/issues/10
    return Auth.resendSignUp(username);
  },

  /**
   * @param username
   * @param password
   * @param refreshTask
   * @return {Promise< | any | never>}
   * @see https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#signin
   */
  signIn(username, password, refreshTask) {
    // TODO: process errors: https://github.com/cybertooth-io/ember-simple-auth-aws-amplify/issues/10
    return Auth.signIn(username, password)
      .then(() => this.currentAuthenticatedUser(refreshTask));
  },

  /**
   * @param refreshTask
   * @return {Promise<any | never>}
   * @see https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#signout
   */
  signOut(refreshTask) {
    // TODO: process errors: https://github.com/cybertooth-io/ember-simple-auth-aws-amplify/issues/10
    return Auth.signOut()
      .then(() => {
        this.set('cognitoUser', null);
        refreshTask.cancelAll();
      });
  },

  /**
   * @param username
   * @param password
   * @param attributesHash
   * @param validationData
   * @return {Promise<>}
   * @see https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#signup
   */
  signUp(username, password, attributesHash, [validationData]) {
    // TODO: process errors: https://github.com/cybertooth-io/ember-simple-auth-aws-amplify/issues/10
    return Auth.signUp({
      username,
      password,
      attributes: attributesHash,
      validationData: validationData
    });
  },

  /**
   * @param attributesHash
   * @return {Promise<string>}
   * @see https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#updateuserattributes
   */
  updateUserAttributes(attributesHash) {
    // TODO: process errors: https://github.com/cybertooth-io/ember-simple-auth-aws-amplify/issues/10
    return Auth.updateUserAttributes(this.get('cognitoUser'), attributesHash);
  },

  /**
   * When signing in for the first time or attempting to pull the CognitoUser from local storage, make sure
   * to configure the task that will refresh the access token at expiry. In addition, the `CognitoUser` instance
   * will be assigned to this service and will also be wrapped in an Ember utility object that will provide
   * convenient access to the Cognito User's basic attributes.
   * @param response
   * @param refreshTask
   * @return {{cognitoUser}}
   * @see CognitoUserProxy
   * @private
   */
  _handleSuccessfulAuthentication(response, refreshTask) {
    refreshTask.cancelAll();
    refreshTask.perform(get(response, 'signInUserSession.accessToken.payload.exp'));
    this.set('cognitoUser', response);
    const cognitoUser = new CognitoUserProxy();
    cognitoUser.set('_cognitoUser', response);
    return { cognitoUser: cognitoUser };
  }
});
