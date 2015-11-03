
var kontainer = require('kontainer-di');
var konfigure = require('kontainer-di-config');
var config    = require('./config/di.json');

var di = konfigure(kontainer, config, __dirname);
var userService;

userService = di.get('user.service');
userService.find(2).then(function(user) {
  console.log('User found! '+user.get('username'));
});