const express = require('express');
const whateverController = require('./controller');
const whatever = express.Router();

whatever.get('/', whateverController.getNothing);
whatever.get('/something/:something', whateverController.getSomething);
whatever.get('/anything', whateverController.getAnything);
whatever.post('/anything', whateverController.getAnythingWithParameters);
whatever.post('/urls', whateverController.getContentFromUrls);

module.exports = whatever;