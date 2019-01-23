const supertest = require('supertest');
const chai = require('chai');
const sinon = require('sinon');

const app = require('../../index');

describe('/whatever API tests', () => {

    describe('GET /whatever', () => {
        it('should return 200 and the message "GET to the whatever API"');
    });

    describe('GET /whatever/something/:something', () => {
        it('should return 200 and an object with the requested parameter');
    });

    describe('GET /whatever/anything', () => {
        it('should return 200 and an auto-generated object');
        it('should return 401, Unauthorized, if the gotten animal is a Horse');
        it('should wait for the callback hook after the API response');
    });

    describe('POST /whatever/anything', () => {
        it('should return an object with the exact parameters sent from POST /anything');
        it('should return error from a POST /anything without all needed parameters');
    });

});
