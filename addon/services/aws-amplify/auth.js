import Auth from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import Service, { inject as service } from '@ember/service';
import AwsAmplifyHub from '../../mixins/aws-amplify/hub';

/**
 * An Ember Service that wraps the AWS Amplify `Auth` instance and makes it available via the `auth` attribute.
 *
 * @see https://aws-amplify.github.io/amplify-js/api/classes/authclass.html
 * @see https://aws-amplify.github.io/docs/js/authentication#manual-setup
 */
export default Service.extend(AwsAmplifyHub, {
  /**
   * A service that reads the Ember `config/environment.js` configuration for the `ember-simple-auth-aws-amplify`
   * add-on.
   *
   * @see https://aws-amplify.github.io/docs/js/authentication#manual-setup
   */
  configuration: service('ember-simple-auth-aws-amplify.configuration'),

  /**
   * Initialize the session service, use AWS Amplify's event hub to respond to events, and most important configure
   * the AWS Amplify `Auth` instance.
   */
  init() {
    this._super(...arguments);
    Hub.listen('auth', this);
    Auth.configure(this.get('configuration.awsAmplifyAuthConfig'));
    Auth.currentAuthenticatedUser({ bypassCache: false })
      .then(() => console.warn('Session initialization recovered a session from local storage.'))
      .catch(response => console.warn('Session initialization FAILED to recover an active session.', response));
    this.set('auth', Auth);
  }
});
