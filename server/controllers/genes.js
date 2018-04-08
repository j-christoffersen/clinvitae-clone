const TrieSearch = require('trie-search');
const knex = require('../../database/knex.js');

const trie = new TrieSearch('name', { min: 2 });

let trieLoaded = false;

const loadTrie = async () => {
  const BATCH_SIZE = 100;
  const totalRecords = parseInt((await knex('genes').count('*'))[0].count, 10);
  let recordsInserted = 0;
  while (recordsInserted < totalRecords) {
    const records = await knex('genes')
      .where('id', '>=', recordsInserted)
      .andWhere('id', '<', recordsInserted + BATCH_SIZE);
    trie.addAll(records);
    recordsInserted += records.length;
  }
  trieLoaded = true;
};

loadTrie();

module.exports = {
  get: (req, res) => {
    if (!trieLoaded) {
      res.status(503).send();
    } else {
      res.send(trie.get(req.query.geneName || ''));
    }
  },
};
