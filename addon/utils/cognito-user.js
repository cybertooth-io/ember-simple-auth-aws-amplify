import { alias, equal, or, readOnly } from '@ember/object/computed';
import EmberObject, { computed } from '@ember/object';

export default EmberObject.extend({

  accessPayload: readOnly('_cognitoUser.signInUserSession.accessToken.payload'),

  accessToken: readOnly('_cognitoUser.signInUserSession.accessToken.jwtToken'),

  attributes: alias('_cognitoUser.attributes'),

  authenticatedAt: computed('authTime', function () {
    return new Date(parseInt(this.get('authTime')) * 1000);
  }),

  authTime: readOnly('accessPayload.auth_time'),

  cognitoGroups: readOnly('idPayload.cognito:groups'),

  cognitoUsername: readOnly('idPayload.cognito:username'),

  'emailVerified?': readOnly('attributes.email_verified'),

  exp: readOnly('accessPayload.exp'),

  expiresAt: computed('exp', function () {
    return new Date(parseInt(this.get('exp')) * 1000);
  }),

  iat: readOnly('accessPayload.iat'),

  idPayload: readOnly('_cognitoUser.signInUserSession.idToken.payload'),

  idToken: readOnly('_cognitoUser.signInUserSession.idToken.jwtToken'),

  issuedAt: computed('iat', function () {
    return new Date(parseInt(this.get('iat')) * 1000);
  }),

  /**
   * The JWT identifier.
   */
  jti: readOnly('accessPayload.jti'),

  'mfaEnabled?': or('mfaSMS?', 'mfaTOTP?'),

  'mfaSMS?': equal('_cognitoUser.preferredMFA', 'SMS'),

  'mfaTOTP?': equal('_cognitoUser.preferredMFA', 'TOTP')
});

