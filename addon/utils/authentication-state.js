import { equal, or, readOnly } from '@ember/object/computed';
import EmberObject from '@ember/object';

/**
 * An instance of `AuthenticationState` is returned from the `session` service's `signIn(...)` function.
 * It allows implementors to determine whether or not they need to prompt for a MFA passcode.
 */
export default EmberObject.extend({

  challengeName: readOnly('_cognitoUser.challengeName'),

  init(/*_cognitoUser*/) {
    this._super(...arguments);
  },

  mfaChallengeDevice: readOnly('_cognitoUser.challengeParam.FRIENDLY_DEVICE_NAME'),

  'mfaRequired?': equal('challengeName', 'SOFTWARE_TOKEN_MFA'),

  'newPasswordRequired?': equal('challengeName', 'NEW_PASSWORD_REQUIRED'),

  'singleStepAuthentication?': equal('challengeName', undefined),

  'twoStepAuthentication?': or('mfaRequired?'),

  /* Private
   ------------------------------------------------------------------------------------------------------------------ */

  /**
   * Set during initialization; e.g. `AuthenticationState.create({cognitoUser: cognitoUser})`.
   * @private
   */
  _cognitoUser: undefined
});
