import { isNone, isPresent } from '@ember/utils';
import { equal, not, readOnly } from '@ember/object/computed';
import { computed, getWithDefault } from '@ember/object';
import Mixin from '@ember/object/mixin';

/**
 * This mixin provides some tangible helpers that can tranform information from your
 * `session.data.authenticated`.  For example, the token `exp` integer is turned
 * into its `Date` equivalent through the `expiresAt` computed.
 *
 * Access these by injecting your session into your controller, route, or template and invoking
 * the getter that you want; for example: `this.get('session.expiresAt')`.
 *
 * @see https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
 */
export default Mixin.create({
  address: readOnly('data.authenticated.attributes.address'),

  authenticatedAt: computed('data.authenticated.accessPayload.auth_time', function () {
    return new Date(parseInt(this.get('data.authenticated.accessPayload.auth_time')) * 1000);
  }),

  /**
   * End-User's birthday, represented as an ISO 8601:2004 [ISO8601‑2004] YYYY-MM-DD format. The
   * year MAY be 0000, indicating that it is omitted. To represent only the year, YYYY format is
   * allowed. Note that depending on the underlying platform's date related function, providing
   * just year can result in varying month and day, so the implementers need to take this factor
   * into account to correctly process the dates.
   * @see https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
   */
  birthDate: computed('data.authenticated.attributes.birthdate', function () {
    if (isPresent(this.get('data.authenticated.attributes.birthdate'))) {
      const splits = this.get('data.authenticated.attributes.birthdate').split('-');
      if (splits[0] === '0000') {
        return null;
      } else {
        return new Date(parseInt(splits[0]), parseInt(splits[1]) - 1, parseInt(splits[2]));
      }
    }
    return null;
  }),

  email: readOnly('data.authenticated.attributes.email'),

  familyName: readOnly('data.authenticated.attributes.family_name'),

  fullName: computed('familyName', 'givenName', 'name', function () {
    if (isNone(this.get('name'))) {
      return `${this.get('givenName')} ${this.get('familyName')}`;
    } else {
      return this.get('name');
    }
  }),

  /**
   * End-User's gender. Values defined by this specification are female and male. Other values MAY be
   * used when neither of the defined values are applicable.
   * @see https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
   */
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

  /**
   * End-User's locale, represented as a BCP47 [RFC5646] language tag. This is typically an
   * ISO 639-1 Alpha-2 [ISO639‑1] language code in lowercase and an ISO 3166-1 Alpha-2 [ISO3166‑1]
   * country code in uppercase, separated by a dash. For example, en-US or fr-CA. As a compatibility
   * note, some implementations have used an underscore as the separator rather than a dash, for
   * example, en_US; Relying Parties MAY choose to accept this locale syntax as well.
   * @see https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
   */
  locale: readOnly('data.authenticated.attributes.locale'),

  'mfaDisabled?': equal('data.authenticated.preferredMFA', 'NOMFA'),

  'mfaEnabled?': not('mfaDisabled?'),

  middleName: readOnly('data.authenticated.attributes.middle_name'),

  /**
   * End-User's full name in displayable form including all name parts, possibly including titles and
   * suffixes, ordered according to the End-User's locale and preferences.
   */
  name: readOnly('data.authenticated.attributes.name'),

  nickname: readOnly('data.authenticated.attributes.nickname'),

  phoneNumber: readOnly('data.authenticated.attributes.phone_number'),

  /**
   * URL of the End-User's profile picture. This URL MUST refer to an image file (for example, a PNG,
   * JPEG, or GIF image file), rather than to a Web page containing an image. Note that this URL
   * SHOULD specifically reference a profile photo of the End-User suitable for displaying when
   * describing the End-User, rather than an arbitrary photo taken by the End-User.
   * @see https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
   */
  picture: readOnly('data.authenticated.attributes.picture'),

  preferredUsername: readOnly('data.authenticated.attributes.preferred_username'),

  /**
   * URL of the End-User's profile page. The contents of this Web page SHOULD be about the End-User.
   * @see https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
   */
  profile: readOnly('data.authenticated.attributes.profile'),

  timezone: readOnly('zoneInfo'),

  /**
   * Time the End-User's information was last updated. Its value is a JSON number representing the
   * number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time.
   * @see https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
   */
  updatedAt: computed('data.authenticated.attributes.updated_at', function () {
    return new Date(parseInt(this.get('data.authenticated.attributes.updated_at')) * 1000);
  }),

  username: readOnly('data.authenticated.accessPayload.username'),

  website: readOnly('data.authenticated.attributes.website'),

  writableAttributes: computed(function () {
    return {
      address: getWithDefault(this, 'address', ''),
      birthdate: getWithDefault(this, 'data.authenticated.attributes.birthdate', ''),
      email: this.get('email'),
      family_name: this.get('familyName'),
      gender: getWithDefault(this, 'gender', ''),
      given_name: this.get('givenName'),
      locale: getWithDefault(this, 'locale', ''),
      middle_name: getWithDefault(this, 'middleName', ''),
      name: this.get('fullName'),
      nickname: getWithDefault(this, 'nickname', ''),
      phone_number: getWithDefault(this, 'phoneNumber', ''),
      picture: getWithDefault(this, 'picture', ''),
      profile: getWithDefault(this, 'profile', ''),
      website: getWithDefault(this, 'website', ''),
      zoneinfo: getWithDefault(this, 'zoneinfo', '')
    }
  }),

  /**
   * String from zoneinfo [zoneinfo] time zone database representing the End-User's time zone. For
   * example, Europe/Paris or America/Los_Angeles.
   * @see https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
   */
  zoneInfo: readOnly('data.authenticated.attributes.zoneinfo')
});
