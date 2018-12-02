Contributing
==============================================================================

Setup
------------------------------------------------------------------------------

* `git clone git@github.com:cybertooth-io/ember-simple-auth-aws-amplify.git`
* `cd ember-simple-auth-aws-amplify`
* `yarn`


### Building The Add-on

* `ember b`
* `ember build`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running The Dummy Application

* `ember server`
* Visit your app at http://localhost:4200.

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

Upgrading The Add-On
------------------------------------------------------------------------------

When upgrading this add-on, after successfully performing `ember init` use the following
commands to install the following dependencies required by this add-on.

```bash
ember install ember-auto-import
ember install ember-concurrency
yarn add @aws-amplify/auth @aws-amplify/core ember-simple-auth
```

Linking This Add-on For Local Testing
------------------------------------------------------------------------------

### Linking

Use yarn.

```bash
# from this add-on project
$ yarn link
# from the other project that depends on this add-on
$ yarn link ember-simple-auth-aws-amplify
```

Note: I've actually had to go into my _other project_ and put this into its `package.json`:
`"ember-simple-auth-aws-amplify": "link:../ember-simple-auth-aws-amplify",`

### Unlinking

Again, use yarn.

```bash
# from the other project that linked to this add-on
$ yarn unlink ember-simple-auth-aws-amplify
# from this add-on project
$ yarn unlink
```

Deploying The Dummy Application
------------------------------------------------------------------------------

Make sure your `~/.aws/credentials` file has a profile named _cybertooth_ 
with a valid key and secret,

```
[cybertooth]
aws_access_key_id = <KEY>
aws_secret_access_key = <SECRET>
```

Deploy by invoking the following command: `ember deploy production`

Confirm your changes are showing up in our S3 container: http://ember-simple-auth-aws-amplify.cybertooth.io/

You may need to go into AWS CloudFront to expire the index.html file before the site 
changes are picked up (see [issue](https://github.com/cybertoothca/ember-cli-text-support-mixins/issues/29)).

Releasing & Publishing To NPM
------------------------------------------------------------------------------

```bash
# `yarn publish` will prompt you for the next/new version name
$ yarn publish
$ git push
$ git push --tags
```
