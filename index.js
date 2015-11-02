
var path = require('path');
var di = require('kontainer-di');

function isModule(val) {
  return (
    typeof val === 'string' &&
    val.indexOf('(') === 0 &&
    val.indexOf(')') === val.length-1
  );
}

module.exports = function(config, dirname) {
  var deps;
  var val;

  if (!path.isAbsolute(dirname)) {
    throw new Error('`dirname` path must be absolute');
  }

  di.register('@', [], di);

  Object.keys(config).forEach(function(key) {
    if (
      Array.isArray(config[key]) &&
      isModule(config[key][0])
    ) {
      val = config[key].shift();
      deps = config[key];
    } else {
      val = config[key];
      deps = [];
    }

    if (isModule(val)) {
      val = val.slice(1,val.length-1);

      if (val.indexOf('.') === 0) {
        val = path.resolve(dirname, val);
      }
      val = require(val);
    }

    di.register(key, deps, val);
  });

  return di;
};
