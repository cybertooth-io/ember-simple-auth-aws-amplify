import EmberObject from '@ember/object';
import SessionAttributesMixin from 'ember-simple-auth-aws-amplify/mixins/session/attributes';
import { module, test } from 'qunit';

const SESSION_ATTRIBUTES = {
  address: 'ADDRESS',
  birthdate: `${new Date(2001, 8, 11).getTime() / 1000}`,
  email: 'EMAIL',
  family_name: 'FAMILY NAME',
  gender: 'GENDER',
  given_name: 'GIVEN NAME',
  locale: 'LOCALE',
  middle_name: 'MIDDLE NAME',
  name: 'NAME',
  nickname: 'NICKNAME',
  phone_number: 'PHONE NUMBER',
  picture: 'PICTURE',
  preferred_username: 'PREFERRED USERNAME',
  profile: 'PROFILE',
  timezone: 'TIMEZONE',
  updated_at: `${new Date(2001, 8, 11, 8, 0, 0).getTime() / 1000}`,
  website: 'WEBSITE'
};
const SESSION_OBJECT = EmberObject.extend(SessionAttributesMixin);

module('Unit | Mixin | session/attributes', function () {

  test('when address', function (assert) {
    let subject = SESSION_OBJECT.create({ data: { authenticated: { attributes: SESSION_ATTRIBUTES } } });

    assert.equal(subject.get('address'), SESSION_ATTRIBUTES.address);
  });

  test('when birthDate', function (assert) {
    let subject = SESSION_OBJECT.create({ data: { authenticated: { attributes: SESSION_ATTRIBUTES } } });

    assert.equal(subject.get('birthDate').toString(), new Date(SESSION_ATTRIBUTES.birthdate * 1000).toString());
  });

  test('when email', function (assert) {
    let subject = SESSION_OBJECT.create({ data: { authenticated: { attributes: SESSION_ATTRIBUTES } } });

    assert.equal(subject.get('email'), SESSION_ATTRIBUTES.email);
  });

  test('when familyName', function (assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('familyName'), SESSION_ATTRIBUTES.family_name);
  });

  test('when fullName', function (assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('fullName'), `${SESSION_ATTRIBUTES.given_name} ${SESSION_ATTRIBUTES.family_name}`);
  });

  test('when gender', function (assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('gender'), SESSION_ATTRIBUTES.gender);
  });

  test('when givenName', function (assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('givenName'), SESSION_ATTRIBUTES.given_name);
  });

  test('when locale', function (assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('locale'), SESSION_ATTRIBUTES.locale);
  });

  test('when middleName', function (assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('middleName'), SESSION_ATTRIBUTES.middle_name);
  });

  test('when name', function (assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('name'), SESSION_ATTRIBUTES.name);
  });

  test('when nickname', function (assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('nickname'), SESSION_ATTRIBUTES.nickname);
  });

  test('when phoneNumber', function (assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('phoneNumber'), SESSION_ATTRIBUTES.phone_number);
  });

  test('when picture', function (assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('picture'), SESSION_ATTRIBUTES.picture);
  });

  test('when preferredUsername', function (assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('preferredUsername'), SESSION_ATTRIBUTES.preferred_username);
  });

  test('when profile', function (assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('profile'), SESSION_ATTRIBUTES.profile);
  });

  test('when timezone', function (assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('timezone'), SESSION_ATTRIBUTES.timezone);
  });

  test('when updatedAt', function (assert) {
    let subject = SESSION_OBJECT.create({
      data: {
        authenticated: {
          attributes: SESSION_ATTRIBUTES
        }
      }
    });

    assert.equal(subject.get('updatedAt').toString(), new Date(SESSION_ATTRIBUTES.updated_at * 1000).toString());
  });
});
