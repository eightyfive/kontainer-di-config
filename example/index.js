
var getContainer = require('kontainer-di-config');
var diConfig = require('./config/di.json');

var di = getContainer(diConfig, __dirname);
var userService = di.get('user.service');

userService.find(2).then(function(user) {
  console.log('User found! '+user.get('username'));
});