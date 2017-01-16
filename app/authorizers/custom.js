import Base from 'ember-simple-auth/authorizers/base';  
import Ember from 'ember';
import config from '../config/environment';

export default Base.extend({  
  session: Ember.inject.service(),
  authorize(data, block) {
    console.log('whoa');

    if (Ember.testing) {
      block('Authorization', 'Bearer beyonce');
    }

    const { token } = data;

    if (this.get('session.isAuthenticated') && token) {
      block('Authorization', `Bearer ${token}`);
    }
  }
});
