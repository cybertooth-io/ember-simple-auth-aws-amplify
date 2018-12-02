/* eslint-env node */
module.exports = {
  description: 'Ember Simple Auth implementation using AWS Amplify.',

  name: 'ember-simple-auth-aws-amplify',

  normalizeEntityName: function () {
  },

  afterInstall: function (/*options*/) {
    return this.addAddonsToProject({
      packages: [
        { name: 'ember-auto-import' },
        { name: 'ember-concurrency' },
        { name: 'ember-simple-auth' }
      ]
    }).then(() => {
      return this.addPackagesToProject([
        { name: '@aws-amplify/auth' },
        { name: '@aws-amplify/core' }
      ])
    });
  }
};
