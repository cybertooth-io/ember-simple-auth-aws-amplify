import { not, notEmpty, or, readOnly } from '@ember/object/computed';
import EmberObject from '@ember/object';

export default EmberObject.extend({

  /**
   * Set during initialization; e.g. `AuthenticationState.create({cognitoUser: cognitoUser})`.
   */
  cognitoUser: undefined,

  init(/*cognitoUser = {}*/) {
    this._super(...arguments);
  },

  mfaChallengeDevice: readOnly('cognitoUser.challengeParam.FRIENDLY_DEVICE_NAME'),

  mfaChallengeName: readOnly('cognitoUser.challengeName'),

  'mfaRequired?': notEmpty('cognitoUser.challengeName'),

  'singleStepAuthentication?': not('twoStepAuthentication?'),

  'twoStepAuthentication?': or('mfaRequired?')
});
