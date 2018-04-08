
exports.seed = knex => (
  knex('variants').del()
    .then(() => knex('genes').del())
    .then(() => knex('genes')
      .insert([
        { name: 'ABC1' },
        { name: 'ABC2' },
        { name: 'ABRA' },
        { name: 'ABBA' },
        { name: 'LEVI' },
        { name: 'WRNGLR' },
      ]))
    .then(() => knex('variants')
      .insert([
        {
          geneId: 1,
          nucleotideChanges: ['NC100', 'NC101'],
          proteinChange: 'p.xxyyxxzz',
          alias: '',
          region: '',
          reportedClassification: 'Good',
          source: 'nick.com',
          lastEvaluated: null,
          lastUpdated: null,
          url: 'www.nick.com',
        },
        {
          geneId: 1,
          nucleotideChanges: ['NC100', 'NC101'],
          proteinChange: 'p.123123123',
          alias: '',
          region: '',
          reportedClassification: 'Bad',
          source: 'nick.com',
          lastEvaluated: null,
          lastUpdated: null,
          url: 'www.nick.com',
        },
        {
          geneId: 2,
          nucleotideChanges: ['NC100', 'NC101'],
          proteinChange: 'p.qwertyuiop',
          alias: '',
          region: '',
          reportedClassification: 'Ugly',
          source: 'nick.com',
          lastEvaluated: null,
          lastUpdated: null,
          url: 'www.nick.com',
        },
      ]))
);
