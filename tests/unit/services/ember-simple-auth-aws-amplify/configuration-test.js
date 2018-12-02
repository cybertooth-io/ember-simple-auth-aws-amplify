import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | ember-simple-auth-aws-amplify/configuration', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:ember-simple-auth-aws-amplify/configuration');
    assert.ok(service);
  });
});
