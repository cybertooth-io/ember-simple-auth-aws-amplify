ember-simple-auth-aws-amplify
==============================================================================

[![npm version](http://badge.fury.io/js/ember-simple-auth-aws-amplify.svg)](http://badge.fury.io/js/ember-simple-auth-aws-amplify) ![downloads](http://img.shields.io/npm/dy/ember-simple-auth-aws-amplify.svg) [![CircleCI](http://circleci.com/gh/cybertooth-io/ember-simple-auth-aws-amplify.svg?style=shield)](http://circleci.com/gh/cybertooth-io/ember-simple-auth-aws-amplify) [![Code Climate](http://codeclimate.com/github/cybertooth-io/ember-simple-auth-aws-amplify/badges/gpa.svg)](http://codeclimate.com/github/cybertooth-io/ember-simple-auth-aws-amplify) 

![Dependencies](http://david-dm.org/cybertooth-io/ember-simple-auth-aws-amplify.svg) [![ember-observer-badge](http://emberobserver.com/badges/ember-simple-auth-aws-amplify.svg)](http://emberobserver.com/addons/ember-simple-auth-aws-amplify) [![License](http://img.shields.io/npm/l/ember-simple-auth-aws-amplify.svg)](LICENSE.md)

[Short description of the addon.]

Built With
------------------------------------------------------------------------------

[![ember-cli-3.4.3](https://img.shields.io/badge/ember--cli-3.4.3-brightgreen.svg)](https://circleci.com/gh/cybertooth-io/ember-simple-auth-aws-amplify)

Tested Against
------------------------------------------------------------------------------

[![ember-lts-2.4](https://img.shields.io/badge/ember--try-ember--lts--2.4-brightgreen.svg)](https://circleci.com/gh/cybertooth-io/ember-simple-auth-aws-amplify)
[![ember-lts-2.8](https://img.shields.io/badge/ember--try-ember--lts--2.8-brightgreen.svg)](https://circleci.com/gh/cybertooth-io/ember-simple-auth-aws-amplify)
[![ember-lts-2.12](https://img.shields.io/badge/ember--try-ember--lts--2.12-brightgreen.svg)](https://circleci.com/gh/cybertooth-io/ember-simple-auth-aws-amplify)
[![ember-lts-2.16](https://img.shields.io/badge/ember--try-ember--lts--2.16-brightgreen.svg)](https://circleci.com/gh/cybertooth-io/ember-simple-auth-aws-amplify)

[![ember-release-2.18](https://img.shields.io/badge/ember--try-ember--release--2.18-brightgreen.svg)](https://circleci.com/gh/cybertooth-io/ember-simple-auth-aws-amplify)
[![ember-default](https://img.shields.io/badge/ember--try-ember--default-brightgreen.svg)](https://circleci.com/gh/cybertooth-io/ember-simple-auth-aws-amplify)
[![ember-beta](https://img.shields.io/badge/ember--try-ember--beta-brightgreen.svg)](https://circleci.com/gh/cybertooth-io/ember-simple-auth-aws-amplify)
[![ember-canary](https://img.shields.io/badge/ember--try-ember--canary-brightgreen.svg)](https://circleci.com/gh/cybertooth-io/ember-simple-auth-aws-amplify)

Demo & Documentation
------------------------------------------------------------------------------

[TODO]

Installation
------------------------------------------------------------------------------

The following command will install this add-on:

```
ember install ember-simple-auth-aws-amplify
```

### Upgrading

When working through the Ember upgrade process, I recommend
invoking the `ember install ember-simple-auth-aws-amplify` command once 
you are done to get the latest version of the add-on.

### Dependencies

#### `@@aws-amplify/auth`

#### `@@aws-amplify/core`

#### `ember-auto-import`

#### `ember-concurrency`

#### `ember-simple-auth`

Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]

----

Contributing
------------------------------------------------------------------------------

# Contributing

## Setup

* `git clone git@github.com:cybertooth-io/ember-simple-auth-aws-amplify.git`
* `yarn`

## Running The Dummy Application

* `ember server`
* Visit your app at http://localhost:4200.

## Running Add-on Tests

* `npm test` (Runs `ember try:testall` to test your add-on against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building The Add-on

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

# Linking This Add-on For Local Testing

## Linking

Use yarn.

```bash
# from this add-on project
$ yarn link
# from the other project that depends on this add-on
$ yarn link ember-simple-auth-aws-amplify
```

## Unlinking

Again, use yarn.

```bash
# from the other project that linked to this add-on
$ yarn unlink ember-simple-auth-aws-amplify
# from this add-on project
$ yarn unlink
```

# Deploying The Dummy Application

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

# Releasing & Publishing To NPM

```bash
# `yarn publish` will prompt you for the next/new version name
$ yarn publish
$ git push
$ git push --tags
```










### Installation

* `git clone <repository-url>`
* `cd ember-simple-auth-aws-amplify`
* `npm install`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

#### Addon Dependencies

When upgrading this add-on, after successfully performing `ember init` use the following
commands to install the following dependencies required by this add-on.

```bash
ember install ember-auto-import
ember install ember-concurrency
ember install ember-simple-auth
yarn add --dev @aws-amplify/auth @aws-amplify/core
```
