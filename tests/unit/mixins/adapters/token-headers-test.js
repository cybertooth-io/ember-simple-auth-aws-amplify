import EmberObject from '@ember/object';
import AdaptersTokenHeadersMixin from 'ember-simple-auth-aws-amplify/mixins/adapters/token-headers';
import { module, test } from 'qunit';

module('Unit | Mixin | adapters/token-headers', function () {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let AdaptersTokenHeadersObject = EmberObject.extend(AdaptersTokenHeadersMixin);
    let subject = AdaptersTokenHeadersObject.create();
    assert.ok(subject);
  });
});
