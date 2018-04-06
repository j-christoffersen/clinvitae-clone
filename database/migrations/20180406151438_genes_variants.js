
exports.up = knex => (
  knex.schema
    .createTable('genes', (table) => {
      table.increments('id').primary();
      table.string('name');
    })
    .createTable('variants', (table) => {
      table.increments('id').primary();
      table.text('name');
      table.specificType('nucleotideChanges', 'text[]');
      table.integer('geneId').references('genes.id').onDelete('CASCADE');
    })
);

exports.down = knex => (
  knex.schema
    .dropTable('variants')
    .dropTable('genes')
);
