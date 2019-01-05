import config from '../../config/environment';
import EmberObject, { getWithDefault } from '@ember/object';
import Service from '@ember/service';

/**
 * Consumes and sets the defaults settings for the `APP.ember-simple-auth-aws-amplify` path
 * found in your `config/environment.js`.
 */
export default Service.extend({
  awsAmplifyAuthConfig: undefined,

  headerAuthorization: undefined,

  headerIdentification: undefined,

  init() {
    this._super(...arguments);

    this.set(
      'awsAmplifyAuthConfig',
      EmberObject.create(getWithDefault(config, 'APP.ember-simple-auth-aws-amplify.awsAmplifyAuth.config', {
        // Amazon Cognito Region
        region: 'xx-yyyyyy-#',
        // Amazon Cognito User Pool ID
        userPoolId: 'xx-yyyyyy-#_zzzzzzzzz',
        // Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
      }))
    );

    this.set(
      'headerAuthorization',
      getWithDefault(config, 'APP.ember-simple-auth-aws-amplify.headerAuthorization', 'Authorization')
    );

    this.set(
      'headerIdentification',
      getWithDefault(config, 'APP.ember-simple-auth-aws-amplify.headerIdentification', 'Identification')
    );

    this.set(
      'totpIssuerName',
      getWithDefault(config, 'APP.ember-simple-auth-aws-amplify.totpIssuerName', 'Ember-Simple-Auth-Issuer-Example')
    );
  }
});
