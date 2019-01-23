const supertest = require('supertest');
const assert = require('chai').assert;
const sandbox = require('sinon').createSandbox();
const nock = require('nock');

const app = require('../../index');
const service = require('../../lib/whatever/service');

describe('/whatever API tests', () => {

  describe('GET /whatever', () => {
    it('should return 200 and the message "GET to the whatever API"', (done) => {
      supertest(app)
        .get('/whatever')
        .expect(200, 'GET to the whatever API')
        .end(done);
    });
  });

  describe('GET /whatever/something/:something', () => {
    it('should return 200 and an object with the requested parameter', (done) => {
      supertest(app)
        .get('/whatever/something/test')
        .expect(200, { something: 'test' })
        .end(done);
    });
  });

  describe('GET /whatever/anything', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('should return 200 and an auto-generated object', (done) => {
      supertest(app)
        .get('/whatever/anything')
        .expect(200)
        .end((err, response) => {
          if (err) done(err);
          assert.property(response.body, 'animal');
          assert.property(response.body, 'city');
          assert.property(response.body, 'hashtag');
          assert.property(response.body, 'text');
          const { animal, city, hashtag, text } = response.body;
          assert.strictEqual(text, `${animal} from ${city} ${hashtag}`);
          done();
        });
    }).retries(3);

    it('should return 200 and an auto-generated object', (done) => {
      sandbox.stub(service, 'generateInfo')
        .onFirstCall()
        .returns({ animal: 'Milrren', city: 'BH', hashtag: '#top' })
        .onSecondCall()
        .returns({ animal: 'Hugo', city: 'Beozonte', hashtag: '#meetup' })
        .onThirdCall()
        .returns({ animal: 'Wesley', city: 'Belô', hashtag: '#node' });

      supertest(app)
        .get('/whatever/anything/quantity/3')
        .expect(200)
        .end((err, response) => {
          if (err) done(err);
          assert.property(response.body, 'things');
          assert.lengthOf(response.body.things, 3);
          assert.deepInclude(response.body.things, { animal: 'Milrren', city: 'BH', hashtag: '#top', text: 'Milrren from BH #top' });
          assert.deepInclude(response.body.things, { animal: 'Hugo', city: 'Beozonte', hashtag: '#meetup', text: 'Hugo from Beozonte #meetup' });
          assert.deepInclude(response.body.things, { animal: 'Wesley', city: 'Belô', hashtag: '#node', text: 'Wesley from Belô #node' });
          done();
        });
    });

    it('should return 401, Unauthorized, if the gotten animal is a Horse', (done) => {
      sandbox.stub(service, 'generateInfo')
        .returns({ animal: 'Horse', city: 'Pirituba', hashtag: '#meetup' });

      supertest(app)
        .get('/whatever/anything')
        .expect(401)
        .end(done);
    });
  });

  describe('POST /whatever/anything', () => {
    it('should return an object with the exact parameters sent from POST /anything', (done) => {
      supertest(app)
        .post('/whatever/anything')
        .send({ animal: 'Milrren', city: 'Belo Horizonte', hashtag: '#top' })
        .expect(200, { animal: 'Milrren', city: 'Belo Horizonte', hashtag: '#top', text: 'Milrren from Belo Horizonte #top' })
        .end(done);
    });

    describe('should return error if all needed parameters aren\'t sent', () => {
      ['animal', 'city', 'hashtag'].forEach((field) => {
        it(`should return error from missing "${field}" field`, (done) => {
          const body = { animal: 'Milrren', city: 'Belo Horizonte', hashtag: '#top' };
          delete body[field];
          supertest(app)
            .post('/whatever/anything')
            .send(body)
            .expect(400, `Missing property: ${field}`)
            .end(done);
        });
      });
    });
  });

  describe('POST /whatever/urls', () => {
    it('should wait for the callback hook after the API response', (done) => {
      nock('http://localhost:3001')
        .get('/teste')
        .reply(200, 'foi bonito foi')
        .post('/callback', { done: true })
        .reply(200, () => done());

      supertest(app)
        .post('/whatever/urls')
        .send({ urls: ['http://localhost:3001/teste'], callbackUrl: 'http://localhost:3001/callback' })
        .expect(200)
        .end((err, response) => {
          if (err) done(err);
          assert.include(response.body, 'foi bonito foi');
        });
    }).timeout(3000);
  });
});
