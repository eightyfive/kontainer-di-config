
var getContainer = require('kontainer-di-config');
var diConfig = require('./config/di.json');

var di = getContainer(diConfig, __dirname);

// di.get('user.service') is available here
// di.get('user.collection') as well..
// Etc ..
