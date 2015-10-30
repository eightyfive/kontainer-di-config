

module.exports = function(bookshelf, User) {
  return bookshelf.Collection.extend({
    model: User,
  });
};
