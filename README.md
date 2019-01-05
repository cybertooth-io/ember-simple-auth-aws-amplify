ember-simple-auth-aws-amplify
==============================================================================

Using [AWS Amplify Auth](https://aws-amplify.github.io/docs/js/authentication) & Core 
library to authenticate with your AWS Cognito User Pool.

**ALPHA ADD-ON: I have just started playing with Cognito and AWS Amplify.**

Features
------------------------------------------------------------------------------

1. Attempt to adhere to the Ember Simple Auth principles while exposing a subset 
of [AWS Amplify's `Auth`](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html)'s features 
through the `session` service.
1. Support sign in/out
1. Append access & identity JWT to Ember Data adapter
1. Expose `CognitoUser`'s `attributes`, `idToken Payload`, & `accessToken Payload` 
in the `session.data.authenticated` property storage 
1. Support automatic refreshing of access token
1. Support Multi-Factor Authentication
1. Support user sign up via email address identifier
1. Support user password change, password reset, and profile attribute updates
1. **WORK IN PROGRESS** - Support Federated Identities
1. **WORK IN PROGRESS** - Tests (SFA tested so far)

**Add issues if there are features you're looking for.**

[![npm version](http://badge.fury.io/js/ember-simple-auth-aws-amplify.svg)](http://badge.fury.io/js/ember-simple-auth-aws-amplify) ![downloads](http://img.shields.io/npm/dy/ember-simple-auth-aws-amplify.svg) [![CircleCI](http://circleci.com/gh/cybertooth-io/ember-simple-auth-aws-amplify.svg?style=shield)](http://circleci.com/gh/cybertooth-io/ember-simple-auth-aws-amplify) [![Code Climate](http://codeclimate.com/github/cybertooth-io/ember-simple-auth-aws-amplify/badges/gpa.svg)](http://codeclimate.com/github/cybertooth-io/ember-simple-auth-aws-amplify) 

![Dependencies](http://david-dm.org/cybertooth-io/ember-simple-auth-aws-amplify.svg) [![ember-observer-badge](http://emberobserver.com/badges/ember-simple-auth-aws-amplify.svg)](http://emberobserver.com/addons/ember-simple-auth-aws-amplify) [![License](http://img.shields.io/npm/l/ember-simple-auth-aws-amplify.svg)](LICENSE.md)

Motivation
------------------------------------------------------------------------------

1. Hide details of the AWS Amplify `Auth` & `CognitoUser`
1. Fold into familiar `ember-simple-auth` ecosystem
1. Automatically refresh access tokens on a schedule using `ember-concurrency`

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

If you've already got the package installed and just want to run the
add-on blueprint: `ember g ember-simple-auth-aws-amplify`.

### Dependencies

* `@aws-amplify/auth` - Authentication library from AWS Amplify; interacts with AWS Cognito User Pool 
* `@aws-amplify/core` - Introduced to take advantage of AWS Amplify's event Hub
* `ember-auto-import` - Pleasantly import `auth` and `core`
* `ember-concurrency` - Timed task for refreshing token
* `ember-simple-auth` - The EmberJs foundation auth add-on 

Quick Start
------------------------------------------------------------------------------

### EmberJs Configuration

Configure your AWS Congnito `region`, `userPoolId`, & `userPoolWebClientId` in your `config/environment.js`
under the `APP.ember-simple-auth-aws-amplify` object path.

```javascript
// config/environment.js
module.exports = function (environment) {
  let ENV = {
    // ...
    APP: {
      'ember-simple-auth-aws-amplify': {
        awsAmplifyAuth: {
          // @see https://aws-amplify.github.io/docs/js/authentication#manual-setup
          config: {
            // Amazon Cognito Region
            region: 'xx-yyyyyy-#',
            // Amazon Cognito User Pool ID
            userPoolId: 'xx-yyyyyy-#_zzzzzzzzz',
            // Amazon Cognito Web Client ID (26-char alphanumeric string)
            userPoolWebClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
          }
        },
        // `mixins/adapters/token-headers.js` uses this field to attach your ACCESS token to your Ember-Data requests
        headerAuthorization: 'Authorization',
        // `mixins/adapters/token-headers.js` uses this field to attach your ID token to your Ember-Data requests
        headerIdentification: 'Identification',
        // `utils/mfa-activation-state.js` takes this in it's constructor and uses it when naming your app 
        // inside the MFA Authenticator App
        totpIssuerName: 'Ember-Simple-Auth-Issuer-Example'
      }
      // ...
    }
    // ...
  };
  // ...
  return ENV;
};
```

### AWS Cognito Configuration

#### Pool Attributes

![][img-pool-attributes]

#### Pool Policies

![][img-pool-policies]

#### Pool MFA And Verifications

![][img-pool-mfa]

#### Pool Devices

![][img-pool-devices]

#### Pool App Clients

![][img-pool-clients]

#### Client Settings

![][img-app-settings]

Examples & Workflow
------------------------------------------------------------------------------

### Sign Up

### Sign In

### Sign Out

Usage
------------------------------------------------------------------------------

[I'll add some more here before official release]

Contributing & Yadda-Yadda-Yadda
------------------------------------------------------------------------------

Check out [CONTRIBUTING.md](CONTRIBUTING.md).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

[img-app-settings]: ./user-pool-app-settings.jpg
[img-pool-attributes]: ./user-pool-general-attributes.jpg
[img-pool-clients]: ./user-pool-general-clients.jpg
[img-pool-devices]: ./user-pool-general-devices.jpg
[img-pool-mfa]: ./user-pool-general-mfa.jpg
[img-pool-policies]: ./user-pool-general-policies.jpg
