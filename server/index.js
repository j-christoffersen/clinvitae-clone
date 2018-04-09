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

app.listen(process.env.PORT || 80);

module.exports = app;
