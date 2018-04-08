const trie = require('../utils/geneAutocompleteTrie.js');

module.exports = {
  get: (req, res) => {
    if (!trie.loaded) {
      res.status(503).send();
    } else {
      res.send(trie.get(req.query.geneName || ''));
    }
  },
};
