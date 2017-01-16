import Ember from 'ember';  
import Base from 'ember-simple-auth/authenticators/base';  
import config from '../config/environment';

const { RSVP: { Promise }, $: { ajax }, run } = Ember;

export default Base.extend({  
  tokenEndpoint: `${config.host}/auth_user`,
  restore(data) {
    return new Promise((resolve, reject) => {
      if (!Ember.isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },
  authenticate(creds) {
    const { identification, password } = creds;
    const data = JSON.stringify({
      email: identification,
      password
    });
    const requestOptions = {
      url: this.tokenEndpoint,
      type: 'POST',
      data,
      contentType: 'application/json',
      dataType: 'json'
    };
    return new Promise((resolve, reject) => {
      ajax(requestOptions).then((response) => {
        const { jwt } = response;
        run(() => {
          resolve({
            token: jwt
          });
        });
      }, (error) => {
        run(() => {
          reject(error);
        });
      });
    });
  },
  invalidate(data) {
    return Promise.resolve(data);
  }
});
