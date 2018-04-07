require('dotenv').config();

const express = require('express');

const { variants } = require('./controllers');

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

app.listen(process.env.PORT || 80);
