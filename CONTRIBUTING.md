# How To Contribute

## Clone & Setup

* `git clone git@github.com:cybertooth-io/ember-simple-auth-aws-amplify.git`
* `cd ember-simple-auth-aws-amplify`
* `yarn install`

## Linting

* `yarn lint:hbs`
* `yarn lint:js`
* `yarn lint:js --fix`

## Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

## Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## Deployment Guide

Visit the [Deployment](DEPLOYMENT.md) guide.

## Linking This Add-on For Local Testing

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
or
`"ember-simple-auth-aws-amplify": "*",`

### Unlinking

Again, use yarn.

```bash
# from this add-on project
$ yarn unlink
# from the other project that linked to this add-on
$ yarn unlink ember-simple-auth-aws-amplify
```

## Commiting Code

Fork and submit a pull request.

Try to use an emoji to help describe the commit:

* 🎉 Initial Commit
* 🔖 Version Tag
* ✨ New Feature
* 🐛 Bugfix
* 🔒 Security Fix
* 📇 Metadata
* ♻️ Refactoring
* 📚 Documentation
* 🌐 Internationalization
* ♿️ Accessibility
* 🐎 Performance
* 🎨 Cosmetic
* 🔧 Tooling
* 🚨 Tests
* 💩 Deprecation
* 🗑 Removal
* 🚧 Work In Progress 


## Releasing & Publishing To NPM

```bash
# `yarn publish` will prompt you for the next/new version name
$ yarn publish
$ git push
$ git push --tags
```
