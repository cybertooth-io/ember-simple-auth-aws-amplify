import { readOnly } from '@ember/object/computed';
import EmberObject, { computed } from '@ember/object';

export default EmberObject.extend({

  accessPayload: readOnly('_cognitoUser.signInUserSession.accessToken.payload'),

  accessToken: readOnly('_cognitoUser.signInUserSession.accessToken.jwtToken'),

  authenticatedAt: computed('authTime', function () {
    return new Date(parseInt(this.get('authTime')) * 1000);
  }),

  authTime: readOnly('accessPayload.auth_time'),

  exp: readOnly('accessPayload.exp'),

  expiresAt: computed('exp', function () {
    return new Date(parseInt(this.get('exp')) * 1000);
  }),

  iat: readOnly('accessPayload.iat'),

  idPayload: readOnly('_cognitoUser.signInUserSession.idToken.payload'),

  idToken: readOnly('_cognitoUser.signInUserSession.idToken.jwtToken'),

  init(cognitoUser) {
    this.set('_cognitoUser', cognitoUser);
  },

  issuedAt: computed('iat', function () {
    return new Date(parseInt(this.get('iat')) * 1000);
  }),

  /**
   * The JWT identifier.
   */
  jti: readOnly('accessPayload.jti'),

  /**
   * Cannot use the field 'attributes' because of EmberObject name conflict.
   */
  subjectAttributes: readOnly('_cognitoUser.attributes')
});

