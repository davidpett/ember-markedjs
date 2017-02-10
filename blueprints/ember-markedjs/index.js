/*jshint node:true*/
module.exports = {
  description: 'ember-markedjs',

  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addAddonToProject('ember-browserify');
  }
};
