import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | aws-amplify-auth-service', function (hooks) {
  setupTest(hooks);

  test('when injecting with a ', function (assert) {
    // assert.throws(...) doesn't work?
    try {
      this.owner.lookup('service:aws-amplify-auth-service');
    } catch (e) {
      assert.equal(e.toString(), 'Error: Invalid UserPoolId format.');
    }
  });
});
