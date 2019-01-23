const express = require('express');
const request = require('request');

const whatever = require('./lib/whatever');

const app = express();
const router = express.Router();

router.use('/whatever', whatever);
app.use('/', router);
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})

module.exports = app;