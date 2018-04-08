const TrieSearch = require('trie-search');
const knex = require('../../database/knex.js');

const trie = new TrieSearch('name', { min: 2 });

trie.loaded = false;

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
  trie.loaded = true;
};

loadTrie();

module.exports = trie;