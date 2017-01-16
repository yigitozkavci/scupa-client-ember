import Ember from 'ember';
import App from '../app';

export default App.AuthenticatedRoute.extend({
  model() {
    this.store.findAll('school');
  }
});
