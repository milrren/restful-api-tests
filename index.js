var express = require('express');
var request = require('request');
var app = express();


app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})

app.post('/nock', function (req, res) {
  request({
    url: 'http://www.example.com/',
    method: 'GET'
  }, function (error, response, body) {
    if (response.statusCode === 200) {
      res.send('This is happening');
    } else if (response.statusCode === 404) {
      res.send('This is not happening');
    } else {
      res.send('You should give up');
    }
  });
})

app.post('/async', function (req, res) {
  setTimeout(function () {
    request({
      url: 'http://www.example.com/',
      method: 'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ check: true })
    });
  }, 1000);
  res.send('Well, this response come too fast');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})

module.exports = app;