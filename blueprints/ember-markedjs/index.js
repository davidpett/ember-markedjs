/*jshint node:true*/
module.exports = {
  description: 'ember-markedjs',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var that = this;
    return that.addAddonToProject('ember-browserify').then(function() {
      return that.addPackagesToProject([
        { name: 'highlight.js', target: '^9.9.0' },
        { name: 'marked', target: '^0.3.6' }
      ]);
    });
  }
};
