import EmberObject from '@ember/object';
import SessionAttributesMixin from 'ember-simple-auth-aws-amplify/mixins/session/attributes';
import { module, test } from 'qunit';

module('Unit | Mixin | session/attributes', function () {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let SessionAttributesObject = EmberObject.extend(SessionAttributesMixin);
    let subject = SessionAttributesObject.create();
    assert.ok(subject);
  });
});
