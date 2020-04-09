const express = require('express');
const past = require('./past');
const future = require('./future');

const app = express();

app.get('/:age', (req, res) => {
  res.send(past(req.params.age, 10) + future(req.params.age, 10));
});

app.listen(3000);
