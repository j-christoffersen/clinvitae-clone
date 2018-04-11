require('dotenv').config();
const path = require('path');

const express = require('express');

const { variants, genes } = require('./controllers');

const JsonHeaders = {
  'Content-Type': 'application/json',
};

const app = express();

const api = express.Router();

api.use((req, res, next) => {
  res.set(JsonHeaders);
  next();
});

api.route('/variants')
  .get(variants.get);

api.route('/search')
  .get(genes.get);

app.use('/api', api);
app.use(express.static(path.join(__dirname, '/../client/dist')));

const port = process.env.NODE_ENV === 'test' ?
  process.env.TEST_PORT || (process.env.PORT || 80) :
  process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});

module.exports = app;
