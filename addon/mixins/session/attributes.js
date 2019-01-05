import { equal, not, readOnly } from '@ember/object/computed';
import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  authenticatedAt: computed('data.authenticated.accessPayload.auth_time', function () {
    return new Date(parseInt(this.get('data.authenticated.accessPayload.auth_time')) * 1000);
  }),

  email: readOnly('data.authenticated.attributes.email'),

  familyName: readOnly('data.authenticated.attributes.family_name'),

  givenName: readOnly('data.authenticated.attributes.given_name'),

  groups: readOnly('data.authenticated.accessPayload.cognito:groups'),

  'emailVerified?': readOnly('data.authenticated.attributes.email_verified'),

  expiresAt: computed('data.authenticated.accessPayload.exp', function () {
    return new Date(parseInt(this.get('data.authenticated.accessPayload.exp')) * 1000);
  }),

  issuedAt: computed('data.authenticated.accessPayload.iat', function () {
    return new Date(parseInt(this.get('data.authenticated.accessPayload.iat')) * 1000);
  }),

  issuer: readOnly('data.authenticated.accessPayload.iss'),

  'mfaDisabled?': equal('data.authenticated.preferredMFA', 'NOMFA'),

  'mfaEnabled?': not('mfaDisabled?'),

  username: readOnly('data.authenticated.accessPayload.username')
});
