import { getOwner } from '@ember/application';
import SessionAttributes from '../mixins/session/attributes';
import SessionFunctions from '../mixins/session/functions';
import SessionService from 'ember-simple-auth/services/session';

export default SessionService.extend(SessionAttributes, SessionFunctions, {

  /**
   * Trigger a forced restore of the session.
   * @return {*|Promise<any>|void}
   */
  forceRestore() {
    return getOwner(this).lookup('session:main').restore();
  }
});
