

module.exports = function(bookshelf) {
  return bookshelf.Model.extend({
    hasTimestamps: true,
    hidden: ['created_at', 'updated_at'],
    tableName: 'users',
  });
};
