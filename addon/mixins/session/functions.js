import { inject as service } from '@ember/service';
import { typeOf } from '@ember/utils';
import Mixin from '@ember/object/mixin';
import AuthenticationState from '../../utils/authentication-state';
import MfaActivationState from '../../utils/mfa-activation-state';

/**
 * This mixin acts as a wrapper for many of the AWS Amplify `Auth`'s functions.
 * @see https://aws-amplify.github.io/amplify-js/api/classes/authclass.html
 */
export default Mixin.create({
  /**
   * A singleton service that provides universal access to AWS Amplify's `Auth` instance.
   */
  awsAmplify: service('aws-amplify.auth'),

  /**
   * @param oldPassword
   * @param newPassword
   * @return {Promise<"SUCCESS">}
   * @see https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#changepassword
   */
  changePassword(oldPassword, newPassword) {
    // TODO: convert this to ember-concurrency task
    return this.get('awsAmplify.auth')
      .currentAuthenticatedUser({ bypassCache: false })
      .then(cognitoUser => this.get('awsAmplify.auth').changePassword(cognitoUser, oldPassword, newPassword))
      .then(() => this.authenticate('authenticator:aws-amplify-authenticator'))
      .catch(response => this._throwErrorResponse(response));
  },

  /**
   * @param authenticationState
   * @param newPassword
   * @param additionalAttributes
   * @return {Promise<T | never>}
   * @see https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#completenewpassword
   */
  completePassword(authenticationState, newPassword, additionalAttributes = {}) {
    return this.get('awsAmplify.auth')
      .completeNewPassword(authenticationState.get('_cognitoUser'), newPassword, additionalAttributes)
      .then((cognitoUser) => {
        authenticationState.set('_cognitoUser', cognitoUser);
        this.authenticate('authenticator:aws-amplify-authenticator');
        return authenticationState;
      })
      .catch(response => this._throwErrorResponse(response));
  },

  /**
   * A service that reads the Ember `config/environment.js` configuration for the `ember-simple-auth-aws-amplify`
   * add-on.
   */
  configuration: service('ember-simple-auth-aws-amplify.configuration'),

  /**
   * @param authenticationState
   * @param mfaCode
   * @return {Promise< | any | never>}
   * @see https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#confirmsignin
   */
  confirmSignIn(authenticationState, mfaCode) {
    return this.get('awsAmplify.auth')
      .confirmSignIn(authenticationState.get('_cognitoUser'), mfaCode, authenticationState.get('challengeName'))
      .then(() => {
        authenticationState.destroy();
        this.authenticate('authenticator:aws-amplify-authenticator');
      })
      .catch(response => this._throwErrorResponse(response));
  },

  disableTOTP() {
    // TODO: convert this to ember-concurrency task
    return this.get('awsAmplify.auth')
      .currentAuthenticatedUser({ bypassCache: false })
      .then(cognitoUser => this.get('awsAmplify.auth').setPreferredMFA(cognitoUser, 'NOMFA'))
      .then(() => this.authenticate('authenticator:aws-amplify-authenticator'))
      .catch(response => this._throwErrorResponse(response));
  },

  /**
   * @param username
   * @return {Promise<any>}
   * @see https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#forgotpassword
   */
  forgotPassword(username) {
    return this.get('awsAmplify.auth')
      .forgotPassword(username)
      .catch(response => this._throwErrorResponse(response));
  },

  /**
   * @param username
   * @param code
   * @param password
   * @return {Promise<void>}
   * @see https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#forgotpasswordsubmit
   */
  resetPassword(username, code, password) {
    return this.get('awsAmplify.auth')
      .forgotPasswordSubmit(username, code, password)
      .catch(response => this._throwErrorResponse(response));
  },

  resendSignUp(username) {
    return this.get('awsAmplify.auth')
      .resendSignUp(username)
      .catch(response => this._throwErrorResponse(response));
  },

  /**
   * @return {Promise<string>}
   * @see https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#setuptotp
   */
  setupTOTP() {
    // TODO: convert this to ember-concurrency task that returns the mfaActivationState?
    let mfaActivationState;
    return this.get('awsAmplify.auth')
      .currentAuthenticatedUser({ bypassCache: false })
      .then(cognitoUser => {
        mfaActivationState = MfaActivationState.create({
          _cognitoUser: cognitoUser,
          issuer: this.get('configuration.totpIssuerName')
        });
        return this.get('awsAmplify.auth').setupTOTP(cognitoUser)
      })
      .then((secret) => {
        mfaActivationState.set('secret', secret);
        return mfaActivationState;
      })
      .catch(response => this._throwErrorResponse(response));
  },

  /**
   * @param username
   * @param password
   * @return {Promise<AuthenticationState>}
   * @see https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#signin
   */
  signIn(username, password) {
    return this.get('awsAmplify.auth')
      .signIn(username, password)
      .then(cognitoUser => {
        const authenticationState = AuthenticationState.create({
          _cognitoUser: cognitoUser
        });
        if (authenticationState.get('singleStepAuthentication?')) {
          this.authenticate('authenticator:aws-amplify-authenticator');
        }
        return authenticationState;
      })
      .catch(response => this._throwErrorResponse(response));
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
    return this.get('awsAmplify.auth')
      .signUp({ username, password, attributes: attributesHash, validationData: validationData })
      .catch(response => this._throwErrorResponse(response));
  },

  /**
   * @param attributesHash
   * @return {Promise<string>}
   * @see https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#updateuserattributes
   */
  updateUserAttributes(attributesHash) {
    return this.get('awsAmplify.auth')
      .currentAuthenticatedUser({ bypassCache: false })
      .then(cognitoUser => this.get('awsAmplify.auth').updateUserAttributes(cognitoUser, attributesHash))
      .then(() => this.authenticate('authenticator:aws-amplify-authenticator'))
      .catch(response => this._throwErrorResponse(response));
  },

  verifyTotpPasscode(mfaActivationState) {
    // TODO: convert this to ember-concurrency task that returns the mfaActivationState on fail and refreshes session on success
    return this.get('awsAmplify.auth')
      .verifyTotpToken(mfaActivationState.get('_cognitoUser'), mfaActivationState.get('passcode'))
      .then(() => {
        return this.get('awsAmplify.auth')
          .setPreferredMFA(mfaActivationState.get('_cognitoUser'), 'TOTP');
      })
      .then(() => {
        mfaActivationState.destroy();
        this.authenticate('authenticator:aws-amplify-authenticator');
      })
      .catch(response => {
        mfaActivationState.set('passcode', '');
        this._throwErrorResponse(response);
      });
  },

  _throwErrorResponse(error) {
    if (typeOf(error) === 'string') {
      throw {
        code: 'UnprocessableEntity',
        message: error,
        name: 'UnprocessableEntity'
      }
    }
    throw error;
  }
})
;
