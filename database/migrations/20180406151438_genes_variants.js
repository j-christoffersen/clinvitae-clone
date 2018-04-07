
exports.up = knex => (
  knex.schema
    .createTable('genes', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.unique('name');
      table.index('name');
    })
    .createTable('variants', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.specificType('nucleotideChanges', 'text[]');
      table.string('proteinChange');
      table.string('alias');
      table.string('region');
      table.string('reportedClassification');
      table.date('lastUpdated');
      table.date('lastEvaluated');
      table.string('source');
      table.string('url');
      table.integer('geneId').references('genes.id').onDelete('CASCADE');
    })
);

exports.down = knex => (
  knex.schema
    .dropTable('variants')
    .dropTable('genes')
);
