
var path = require('path');

function isDi(val) {
  var keys;

  if (!isObject(val)) {
    return false;
  }

  keys = Object.keys(val);

  return (
    keys.length === 1 &&
    isFactory(keys[0]) && // di key?
    Array.isArray(val[keys[0]]) // di deps?
  );
}

function isFactory(val) {
  return (
    typeof val === 'string' &&
    /^\(.+\)$/.test(val)
  );
}

function isObject(obj) {
  return typeof obj === 'object' && !Array.isArray(obj) && !!obj;
}

module.exports = function(di, config, dirname) {
  var diDeps;
  var diVal;

  if (!path.isAbsolute(dirname)) {
    throw new Error('`dirname` path must be absolute');
  }

  di.register('@', [], di);

  Object.keys(config).forEach(function(diKey) {
    if (isDi(config[diKey])) {
      Object.keys(config[diKey]).forEach(function(factory) {
        diVal = factory;
        diDeps  = config[diKey][factory];
      });
    } else {
      diVal = config[diKey];
      diDeps  = [];
    }

    if (isFactory(diVal)) {
      diVal = diVal.slice(1,diVal.length-1);

      if (diVal.indexOf('.') === 0) {
        diVal = path.resolve(dirname, diVal);
      }
      diVal = require(diVal);
    }

    di.register(diKey, diDeps, diVal);
  });

  return di;
};
