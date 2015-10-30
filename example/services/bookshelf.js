
var bookshelfLib = require('bookshelf');

module.exports = function(knex) {
  var bookshelf = bookshelfLib(knex);

  // Plugins
  bookshelf.plugin('visibility');

  return bookshelf;
};
