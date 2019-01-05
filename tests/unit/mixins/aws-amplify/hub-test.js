import EmberObject from '@ember/object';
import AwsAmplifyHubMixin from 'ember-simple-auth-aws-amplify/mixins/aws-amplify/hub';
import { module, test } from 'qunit';

module('Unit | Mixin | aws-amplify/hub', function () {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let AwsAmplifyHubObject = EmberObject.extend(AwsAmplifyHubMixin);
    let subject = AwsAmplifyHubObject.create();
    assert.ok(subject);
  });
});
