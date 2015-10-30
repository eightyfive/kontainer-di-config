

module.exports = function(User, Users) {
  return {
    find: function find(id) {
      return User.forge({'id': id}).fetch();
    },
    findOneBySlug: function findAll() {
      return Users.forge().fetch();
    },
  };
};
