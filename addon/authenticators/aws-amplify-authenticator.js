import { inject as service } from '@ember/service';
import Base from 'ember-simple-auth/authenticators/base';
import { task, timeout } from 'ember-concurrency';
import { getOwner } from '@ember/application';

export default Base.extend({

  /**
   * Expects the username and password in order to authenticate.
   * @param username
   * @param password
   * @return {Promise< | any> | *}
   */
  authenticate(username, password) {
    return this.get('awsAmplifyAuthService').signIn(username, password, this.get('refreshAccessTokenTask'));
  },

  /**
   * This service simply wraps AWS Amplify's `Auth` class instance.  If you need access to `Auth` override the
   * `aws-amplify-auth-service` service.
   */
  awsAmplifyAuthService: service(),

  /**
   * Takes no arguments.
   * @return {Promise<any> | *}
   */
  invalidate(/*data*/) {
    return this.get('awsAmplifyAuthService').signOut(this.get('refreshAccessTokenTask'));
  },

  /**
   * This is an ember-concurrency task that waits until access token expiry and then fires
   * a restore on the session (just like in `ember-simple-auth/addon/initializers/setup-session-restoration.js`).
   *
   */
  refreshAccessTokenTask: task(function* (exp) {
    const wait = exp * 1000 - Date.now();
    console.warn('Scheduled token refresh will occur at ', new Date(exp * 1000));

    yield timeout(wait);

    console.warn('Commencing refresh of the access token.');
    return getOwner(this).lookup('session:main').restore();
  }),

  /**
   * Takes no arguments.
   * @return {Promise< | any> | *}
   */
  restore(/*data*/) {
    return this.get('awsAmplifyAuthService').currentAuthenticatedUser(this.get('refreshAccessTokenTask'));
  },
});
