'use strict';

describe('POST tests and whatever you want', function () {
  it('This first test should check a simple: POST /', function (done) {
    request(app)
      .post('/')
      .expect(200)
      .end(function (err, res) {
        assert.isNull(err);
        assert(res.text, 'POST request to the homepage');
        done();
      });
  });

  it('This should nock a URL with 200 for: POST /nock', function (done) {
    var googleNock = nock('http://www.example.com')
      .get('/')
      .reply(200);

    request(app)
      .post('/nock')
      .expect(200)
      .end(function (err, res) {
        assert.isNull(err);
        assert.strictEqual(res.text, 'This is happening');
        assert.isTrue(googleNock.isDone());
        done();
      });
  });

  it('This should nock a URL with 404 for: POST /nock', function (done) {
    var googleNock = nock('http://www.example.com')
      .get('/')
      .reply(404);

    request(app)
      .post('/nock')
      .expect(200)
      .end(function (err, res) {
        assert.isNull(err);
        assert.strictEqual(res.text, 'This is not happening');
        assert.isTrue(googleNock.isDone());
        done();
      });
  });

  it('This should check the content posted to a nock for: POST /async', function (done) {
    nock('http://www.example.com')
      .post('/')
      .reply(200, function (uri, response) {
        assert.strictEqual(response.check, true);
        done();
      });

    request(app)
      .post('/async')
      .expect(200)
      .end(function (err, res) {
        assert.isNull(err);
        assert.strictEqual(res.text, 'Well, this response come too fast');
      });
  });
});