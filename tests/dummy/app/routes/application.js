import Ember from 'ember';
import markdownFiles from 'ember-fr-markdown-file/markdownFiles';

export default Ember.Route.extend({
  model() {
    return Ember.get(markdownFiles, 'test');
  }
});
