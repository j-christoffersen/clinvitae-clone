const TrieSearch = require('trie-search');
const knex = require('../../database/knex.js');

const trie = new TrieSearch('name', { min: 2 });

let trieLoaded = false;

const BATCH_SIZE = 100;


const insert = async (currentId) => {
  const records = await knex('genes')
    .where('id', '>=', currentId)
    .andWhere('id', '<', currentId + BATCH_SIZE);
  trie.addAll(records);
};

const loadTrie = async () => {
  const maxId = parseInt(
    (await knex('genes').max('id'))[0].max,
    10,
  );
  let currentId = 0;
  const insertions = [];

  while (currentId < maxId) {
    insertions.push(insert(currentId));
    currentId += BATCH_SIZE;
  }

  await Promise.all(insertions);
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
