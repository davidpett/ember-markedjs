/*jshint node:true*/
module.exports = {
  description: 'ember-markedjs',

  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addAddonToProject('ember-browserify').then(function() {
      this.addPackagesToProject([
        { name: 'highlight.js', target: '^9.9.0' },
        { name: 'marked', target: '^0.3.6' }
      ]);
    });
  }
};
