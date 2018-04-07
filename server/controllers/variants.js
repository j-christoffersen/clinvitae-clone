const { Gene } = require('../../database/models');

module.exports = {
  get: (req, res) => {
    if (req.query.geneName) {
      Gene.where({ name: req.query.geneName })
        .fetch({
          withRelated: 'variants',
        })
        .then((data) => {
          res.send(data.relations.variants);
        });
    } else {
      res.status(400).send(JSON.stringify('query must include geneName'));
    }
  },
};
