import { not, notEmpty, or, readOnly } from '@ember/object/computed';
import EmberObject from '@ember/object';

/**
 * An instance of `AuthenticationState` is returned from the `session` service's `signIn(...)` function.
 * It allows implementors to determine whether or not they need to prompt for a MFA passcode.
 */
export default EmberObject.extend({

  /**
   * Set during initialization; e.g. `AuthenticationState.create({cognitoUser: cognitoUser})`.
   * @private
   */
  _cognitoUser: undefined,

  init(/*_cognitoUser*/) {
    this._super(...arguments);
  },

  mfaChallengeDevice: readOnly('_cognitoUser.challengeParam.FRIENDLY_DEVICE_NAME'),

  mfaChallengeName: readOnly('_cognitoUser.challengeName'),

  'mfaRequired?': notEmpty('_cognitoUser.challengeName'),

  'singleStepAuthentication?': not('twoStepAuthentication?'),

  'twoStepAuthentication?': or('mfaRequired?')
});
