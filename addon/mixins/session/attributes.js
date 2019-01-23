import { equal, not, readOnly } from '@ember/object/computed';
import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';

/**
 * This mixin provides some tangible helpers that can tranform information from your
 * `session.data.authenticated`.  For example, the token `exp` integer is turned
 * into its `Date` equivalent through the `expiresAt` computed.
 *
 * Access these by injecting your session into your controller, route, or template and invoking
 * the getter that you want; for example: `this.get('session.expiresAt')`.
 */
export default Mixin.create({
  address: readOnly('data.authenticated.attributes.address'),

  authenticatedAt: computed('data.authenticated.accessPayload.auth_time', function () {
    return new Date(parseInt(this.get('data.authenticated.accessPayload.auth_time')) * 1000);
  }),

  birthDate: computed('data.authenticated.attributes.birthdate', function () {
    return new Date(parseInt(this.get('data.authenticated.attributes.birthdate')) * 1000);
  }),

  email: readOnly('data.authenticated.attributes.email'),

  familyName: readOnly('data.authenticated.attributes.family_name'),

  fullName: computed('familyName', 'givenName', function () {
    return `${this.get('givenName')} ${this.get('familyName')}`;
  }),

  gender: readOnly('data.authenticated.attributes.gender'),

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

  locale: readOnly('data.authenticated.attributes.locale'),

  'mfaDisabled?': equal('data.authenticated.preferredMFA', 'NOMFA'),

  'mfaEnabled?': not('mfaDisabled?'),

  middleName: readOnly('data.authenticated.attributes.middle_name'),

  name: readOnly('data.authenticated.attributes.name'),

  nickname: readOnly('data.authenticated.attributes.nickname'),

  phoneNumber: readOnly('data.authenticated.attributes.phone_number'),

  picture: readOnly('data.authenticated.attributes.picture'),

  preferredUsername: readOnly('data.authenticated.attributes.preferred_username'),

  profile: readOnly('data.authenticated.attributes.profile'),

  timezone: readOnly('data.authenticated.attributes.timezone'),

  updatedAt: computed('data.authenticated.attributes.updated_at', function () {
    return new Date(parseInt(this.get('data.authenticated.attributes.updated_at')) * 1000);
  }),

  username: readOnly('data.authenticated.accessPayload.username')
});
