import EmberObject from '@ember/object';
import SessionFunctionsMixin from 'ember-simple-auth-aws-amplify/mixins/session/functions';
import { module, test } from 'qunit';

module('Unit | Mixin | session/functions', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let SessionFunctionsObject = EmberObject.extend(SessionFunctionsMixin);
    let subject = SessionFunctionsObject.create();
    assert.ok(subject);
  });
});
