import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

App.AuthenticatedRoute = Ember.Route.extend({
  session: Ember.inject.service(),
  beforeModel: function(transition) {
    if (!this.get('session.isAuthenticated')) {
      return this.transitionTo('login');
    }
  }
});

export default App;
