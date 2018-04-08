require('dotenv').config();

const express = require('express');

const { variants, genes } = require('./controllers');

const JsonHeaders = {
  'Content-Type': 'application/json',
};

const app = express();

app.route('/')
  .get((req, res) => {
    res.send('CLINVITAE');
  });

app.use((req, res, next) => {
  res.set(JsonHeaders);
  next();
});

app.route('/api/variants')
  .get(variants.get);

app.route('/api/search')
  .get(genes.get);

app.listen(process.env.PORT || 80);

module.exports = app;
