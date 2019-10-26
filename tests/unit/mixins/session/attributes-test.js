import EmberObject from '@ember/object';
import { setupTest } from 'ember-qunit';
import SessionAttributesMixin from 'ember-simple-auth-aws-amplify/mixins/session/attributes';
import { module, test } from 'qunit';

let SESSION_ATTRIBUTES = {};
const SESSION_OBJECT = EmberObject.extend(SessionAttributesMixin);

module('Unit | Mixin | session/attributes', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function(/*assert*/) {
    SESSION_ATTRIBUTES = {
      address: 'ADDRESS',
      birthdate: '2001-09-11',
      email: 'EMAIL',
      family_name: 'FAMILY NAME',
      gender: 'GENDER',
      given_name: 'GIVEN NAME',
      locale: 'LOCALE',
      middle_name: 'MIDDLE NAME',
      name: 'FULL NAME',
      nickname: 'NICKNAME',
      phone_number: 'PHONE NUMBER',
      picture: 'PICTURE',
      preferred_username: 'PREFERRED USERNAME',
      profile: 'PROFILE',
      updated_at: `${new Date(2001, 8, 11, 8, 0, 0).getTime() / 1000}`,
      website: 'WEBSITE',
      zoneinfo: 'TIMEZONE'
    };
  });

  test('when address', function(assert) {
    let subject = SESSION_OBJECT.create({ data: { authenticated: { attributes: SESSION_ATTRIBUTES } } });

    assert.equal(subject.get('address'), SESSION_ATTRIBUTES.address);
  });

  test('when birthDate', function(assert) {
    let subject = SESSION_OBJECT.create({ data: { authenticated: { attributes: SESSION_ATTRIBUTES } } });

    assert.equal(subject.get('birthDate').toString(), new Date(2001, 8, 11).toString());
  });

  test('when birthDate is year of 0000', function(assert) {
    SESSION_ATTRIBUTES.birthdate = '0000-01-01';
    let subject = SESSION_OBJECT.create({ data: { authenticated: { attributes: SESSION_ATTRIBUTES } } });

    assert.equal(subject.get('birthDate'), null);
  });

  test('when birthDate is null', function(assert) {
    SESSION_ATTRIBUTES.birthdate = null;
    let subject = SESSION_OBJECT.create({ data: { authenticated: { attributes: SESSION_ATTRIBUTES } } });

    assert.equal(subject.get('birthDate'), null);
  });

  test('when email', function(assert) {
    let subject = SESSION_OBJECT.create({ data: { authenticated: { attributes: SESSION_ATTRIBUTES } } });

    assert.equal(subject.get('email'), SESSION_ATTRIBUTES.email);
  });

  test('when familyName', function(assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('familyName'), SESSION_ATTRIBUTES.family_name);
  });

  test('when fullName is given+family because name attribute does not exist', function(assert) {
    SESSION_ATTRIBUTES.name = null;
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('name'), null);
    assert.equal(subject.get('fullName'), `${SESSION_ATTRIBUTES.given_name} ${SESSION_ATTRIBUTES.family_name}`);
  });

  test('when fullName is name attribute', function(assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('name'), SESSION_ATTRIBUTES.name);
    assert.equal(subject.get('fullName'), SESSION_ATTRIBUTES.name);
  });

  test('when gender', function(assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('gender'), SESSION_ATTRIBUTES.gender);
  });

  test('when givenName', function(assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('givenName'), SESSION_ATTRIBUTES.given_name);
  });

  test('when locale', function(assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('locale'), SESSION_ATTRIBUTES.locale);
  });

  test('when middleName', function(assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('middleName'), SESSION_ATTRIBUTES.middle_name);
  });

  test('when name', function(assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('name'), SESSION_ATTRIBUTES.name);
  });

  test('when nickname', function(assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('nickname'), SESSION_ATTRIBUTES.nickname);
  });

  test('when phoneNumber', function(assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('phoneNumber'), SESSION_ATTRIBUTES.phone_number);
  });

  test('when picture', function(assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('picture'), SESSION_ATTRIBUTES.picture);
  });

  test('when preferredUsername', function(assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('preferredUsername'), SESSION_ATTRIBUTES.preferred_username);
  });

  test('when profile', function(assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('profile'), SESSION_ATTRIBUTES.profile);
  });

  test('when timezone', function(assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('timezone'), SESSION_ATTRIBUTES.zoneinfo);
  });

  test('when updatedAt', function(assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('updatedAt').toString(), new Date(SESSION_ATTRIBUTES.updated_at * 1000).toString());
  });

  test('when website', function(assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('website'), SESSION_ATTRIBUTES.website);
  });

  test('when zoneInfo', function(assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('zoneInfo'), SESSION_ATTRIBUTES.zoneinfo);
  });
});
