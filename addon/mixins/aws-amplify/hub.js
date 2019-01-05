import Mixin from '@ember/object/mixin';

/**
 * Support for AWS Amplify's event Hub during authentication.
 *
 * @see https://aws-amplify.github.io/docs/js/authentication#subscribing-events
 * @see https://aws-amplify.github.io/docs/js/hub#listening-authentication-events
 * @see https://aws-amplify.github.io/amplify-js/api/classes/hubclass.html
 */
export default Mixin.create({
  /**
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Experimental
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Part of AWS Amplify Hub listening to events on the Auth channel.  Currently does nothing.
   */
  afterConfigured() {
    // override accordingly
  },

  /**
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Experimental
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Part of AWS Amplify Hub listening to events on the Auth channel.  Currently does nothing.
   */
  afterSignIn() {
    // override accordingly
  },

  /**
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Experimental
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Part of AWS Amplify Hub listening to events on the Auth channel.  Currently does nothing.
   */
  afterSignInFailure() {
    // override accordingly
  },

  /**
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Experimental
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Part of AWS Amplify Hub listening to events on the Auth channel.  Currently does nothing.
   */
  afterSignOut() {
    // override accordingly
  },

  /**
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Experimental
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Part of AWS Amplify Hub listening to events on the Auth channel.  Currently does nothing.
   */
  afterSignUp() {
    // override accordingly
  },

  /**
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * Experimental
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   *
   * I'm just testing out the events that Amplify provides through Hub.  This may or may not disappear in the future.
   *
   * @param capsule
   */
  onHubCapsule(capsule) {
    switch (capsule.payload.event) {
      case 'configured':
        this.afterConfigured();
        break;
      case 'signIn':
        this.afterSignIn();
        break;
      case 'signIn_failure':
        this.afterSignInFailure();
        break;
      case 'signOut':
        this.afterSignOut();
        break;
      case 'signUp':
        this.afterSignUp();
        break;
      default:
        console.warn(`AWS Amplify Hub - AUTH Event -> '${capsule.payload.event}' was ignored in authenticator/aws-amplify-auth.js`);
    }
  }
});
