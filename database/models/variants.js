const bookshelf = require('../bookshelf.js');

require('./genes.js');

const Variant = bookshelf.Model.extend({
  tableName: 'variants',
  variants() {
    return this.belongsTo('Gene', 'geneId');
  },
});

module.exports = Variant;
