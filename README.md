ember-simple-auth-aws-amplify
==============================================================================

Using [AWS Amplify Auth](https://aws-amplify.github.io/docs/js/authentication) & Core 
library to authenticate with your AWS Cognito User Pool.

**ALPHA ADD-ON: I have just started playing with Cognito and AWS Amplify.  I moved this code to an add-on because it
gave me hives allowing it to reside within my Ember App.  I still need to round out the services.**

**Add issues if there are features you're looking for.**

[This might be a more stable add-on for your Cognito needs but instead uses `amazon-cognito-identity-js`](https://github.com/paulcwatts/ember-cognito)

[![npm version](http://badge.fury.io/js/ember-simple-auth-aws-amplify.svg)](http://badge.fury.io/js/ember-simple-auth-aws-amplify) ![downloads](http://img.shields.io/npm/dy/ember-simple-auth-aws-amplify.svg) [![CircleCI](http://circleci.com/gh/cybertooth-io/ember-simple-auth-aws-amplify.svg?style=shield)](http://circleci.com/gh/cybertooth-io/ember-simple-auth-aws-amplify) [![Code Climate](http://codeclimate.com/github/cybertooth-io/ember-simple-auth-aws-amplify/badges/gpa.svg)](http://codeclimate.com/github/cybertooth-io/ember-simple-auth-aws-amplify) 

![Dependencies](http://david-dm.org/cybertooth-io/ember-simple-auth-aws-amplify.svg) [![ember-observer-badge](http://emberobserver.com/badges/ember-simple-auth-aws-amplify.svg)](http://emberobserver.com/addons/ember-simple-auth-aws-amplify) [![License](http://img.shields.io/npm/l/ember-simple-auth-aws-amplify.svg)](LICENSE.md)

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

Quick Start
------------------------------------------------------------------------------

1. Configure your AWS Congnito `region`, `userPoolId`, & `userPoolWebClientId` in your `config/environment.js`
under the `APP.ember-simple-auth-aws-amplify` object path.
```javascript
// config/environment.js
module.exports = function (environment) {
  let ENV = {
    // ...
    APP: {
      'ember-simple-auth-aws-amplify': {
        awsAmplifyAuth: {
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
      }
      // ...
    }
    // ...
  };
  // ...
  return ENV;
};
```
2. Inject the basic Ember Simple Auth service into your route or controller: `session: service()`.
1. Then in your route or controller action that the login form submits to: 
`this.get('session').authenticate('authenticator:aws-amplify-authenticator', username, password);`. This
returns a promise, deal with it accordingly!
1. After authenticating, your standard _Ember Simple Auth_ `session` will have a copy of your
AWS `CognitoUser` instance.  In fact, I've created a little proxy object to get you at the meat and potatoes:
```javascript
this.get('session.data.authenticated.cognitoUser.accessToken');   // -> your signed access token
this.get('session.data.authenticated.cognitoUser.idToken');       // -> your signed id token
this.get('session.data.authenticated.cognitoUser.idPayload');     // -> your id token's decoded payload
this.get('session.data.authenticated.cognitoUser._cognitoUser');  // -> reference to the instance returned by Cognito
// check out the remaining helpers at `addons/utils/cognito-user.js`
```
5. For logging out, `this.get('session').invalidate();`.  This also returns a promise, again deal accordingly!
1. I'm using the `addon/services/aws-amplify-auth-service.js` to expose AWS Amplify Auth methods (e.g. `signUp(...)`).
Inject this as `awsAmplifyAuthService: service()` in your routes and controllers.

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

#### `@aws-amplify/auth`

#### `@aws-amplify/core`

#### `ember-auto-import`

#### `ember-concurrency`

#### `ember-simple-auth`

Usage
------------------------------------------------------------------------------

[I'll add some more here before official release]

Contributing & Yadda-Yadda-Yadda
------------------------------------------------------------------------------

Check out [CONTRIBUTING.md](CONTRIBUTING.md).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
