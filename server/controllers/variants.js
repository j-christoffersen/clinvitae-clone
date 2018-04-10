const { Gene } = require('../../database/models');

module.exports = {
  get: (req, res) => {
    if (req.query.geneName) {
      Gene.where({ name: req.query.geneName })
        .fetch({
          withRelated: 'variants',
        })
        .then((data) => {
          res.send(data.relations.variants.serialize()
            .map(variant => Object.assign(
              {},
              variant,
              { gene: req.query.geneName }
            )));
        });
    } else {
      res.status(400).send(JSON.stringify('query must include geneName'));
    }
  },
};
