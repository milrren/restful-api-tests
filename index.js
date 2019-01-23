const express = require('express');
const bodyParser = require('body-parser');

const whatever = require('./lib/whatever');

const app = express();
const router = express.Router();
router.use('/whatever', whatever);
app.use(bodyParser.json());
app.use('/', router);
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})

module.exports = app;