require('dotenv').config();

const express = require('express');

const app = express();

app.route('/')
  .get((req, res) => {
    res.send('CLINVITAE');
  });

app.listen(process.env.PORT || 80);
