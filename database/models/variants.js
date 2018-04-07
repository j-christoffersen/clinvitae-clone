const bookshelf = require('../bookshelf.js');

require('./genes.js');

const Variant = bookshelf.model.extend({
  tableName: 'variants',
  variants() {
    return this.belongsTo('Gene', 'geneId');
  },
});

module.exports = Variant;
