const bookshelf = require('../bookshelf.js');

require('./variants.js');

const Gene = bookshelf.model.extend({
  tableName: 'genes',
  variants() {
    return this.hasMany('Variant', 'geneId');
  },
});

module.exports = Gene;
