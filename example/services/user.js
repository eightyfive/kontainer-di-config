

module.exports = function(User, Users) {
  return {
    find: function(id) {
      return User.forge({'id': id}).fetch();
    },
    findAll: function() {
      return Users.forge().fetch();
    },
  };
};
