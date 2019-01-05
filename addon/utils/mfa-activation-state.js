import { and, not, notEmpty } from '@ember/object/computed';
import EmberObject, { computed } from '@ember/object';

export default EmberObject.extend({

  /**
   * Set during initialization; e.g. `MfaActivationState.create({cognitoUser: cognitoUser})`.
   */
  cognitoUser: undefined,

  init(/*cognitoUser, issuer*/) {
    this._super(...arguments);
  },

  issuer: 'Ember-Simple-Auth-Issuer-Example',

  /**
   * @see https://github.com/google/google-authenticator/wiki/Key-Uri-Format
   */
  qrcUrl: computed('cognitoUser.signInUserSession.idToken.payload.email', 'secret', function () {
    const issuer = encodeURIComponent(this.get('issuer'));
    const email = encodeURIComponent(this.get('cognitoUser.signInUserSession.idToken.payload.email'));
    const secret = this.get('secret');
    const label = `${issuer}:${email}`;
    return `otpauth://totp/${label}?secret=${secret}&issuer=${issuer}`;
  }),

  passcodeOne: '',

  'passcodeOneRequired?': not('passcodeOneVerified?'),

  'passcodeOneVerified?': false,

  passcodeTwo: '',

  'passcodeTwoRequired?': not('passcodeTwoVerified?'),

  'passcodeTwoVerified?': false,

  secret: '',

  'secretPresent?': notEmpty('secret'),

  /**
   * Step 1 presents the QRC and asks the user for the first code.
   */
  'step1?': and('secretPresent?', 'passcodeOneRequired?', 'passcodeTwoRequired?'),

  /**
   * Step 2 asks the user for the second code.
   */
  'step2?': and('secretPresent?', 'passcodeOneVerified?', 'passcodeTwoRequired?')
});
