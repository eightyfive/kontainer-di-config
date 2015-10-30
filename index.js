
var path = require('path');
var di = require('kontainer-di');

module.exports = function(config, dirname) {
  var deps;

  if (!path.isAbsolute(dirname)) {
    throw new Error('`dirname` path must be absolute');
  }

  di.register('@', [], di);

  Object.keys(config).forEach(function(key) {
    Object.keys(config[key]).forEach(function(modulename) {
      deps = config[key][modulename];
      if (modulename.indexOf('.') === 0) {
        modulename = path.resolve(dirname, modulename);
      }
      di.register(key, deps, require(modulename));
    });
  });

  return di;
};
