global.request = require('supertest');
global.app = require(process.cwd());
global.assert = require('chai').assert;
global.nock = require('nock');