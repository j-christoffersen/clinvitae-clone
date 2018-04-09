const { genes, variants } = require('../dbFixtures.js');

exports.seed = knex => (
  knex('variants').del()
    .then(() => knex('genes').del())
    .then(() => knex('genes')
      .insert(genes))
    .then(() => knex('variants')
      .insert(variants))
);
