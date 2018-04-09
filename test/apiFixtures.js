const { genes, variants } = require('./dbFixtures.js');

module.exports = {
  variants: variants.map((variant) => {
    const newVariant = JSON.parse(JSON.stringify(variant));
    newVariant.gene = genes[variant.geneId].name;
    delete newVariant.geneId;
    return newVariant;
  }),
};
