const express = require('express');
const whateverController = require('./controller');
const whatever = express.Router();

whatever.get('/', whateverController.getNothing);
whatever.get('/something/:something', whateverController.getSomething);
whatever.get('/anything', whateverController.getAnything);
whatever.get('/anything/quantity/:quantity', whateverController.getMoreThanAnything);
whatever.post('/anything', whateverController.getAnythingWithParameters);
whatever.post('/urls', whateverController.getContentFromUrls);

module.exports = whatever;