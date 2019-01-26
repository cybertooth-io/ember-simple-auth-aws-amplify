import { and, equal, notEmpty } from '@ember/object/computed';
import EmberObject, { computed } from '@ember/object';

/**
 * An instance of `MfaActivationState` is returned from the `session` service's `setupTOTP(...)` function.
 * It exists to help store state during the multiple steps that are required in configuring and activating
 * an Authenticator app.
 */
export default EmberObject.extend({

  /**
   * Set during initialization; e.g. `MfaActivationState.create({_cognitoUser: cognitoUser})`.
   * @private
   */
  _cognitoUser: undefined,

  init(/*_cognitoUser, issuer*/) {
    this._super(...arguments);
  },

  issuer: 'Ember-Simple-Auth-Issuer-Example',

  'mfaInactive?': equal('_cognitoUser.preferredMFA', 'NOMFA'),

  /**
   * @see https://github.com/google/google-authenticator/wiki/Key-Uri-Format
   */
  qrcUrl: computed('_cognitoUser.signInUserSession.idToken.payload.email', 'secret', function () {
    const issuer = encodeURIComponent(this.get('issuer'));
    const email = encodeURIComponent(this.get('_cognitoUser.signInUserSession.idToken.payload.email'));
    const secret = this.get('secret');
    const label = `${issuer}:${email}`;
    return `otpauth://totp/${label}?secret=${secret}&issuer=${issuer}`;
  }),

  passcode: '',

  secret: '',

  'verifyRequired?': and('mfaInactive?', 'secretPresent?'),

  'secretPresent?': notEmpty('secret')
});
