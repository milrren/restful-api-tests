'use strict';

describe('GET tests and whatever you want', () => {
  it('This first test should check a simple: GET /', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        assert.isNull(err);
        assert(res.text, 'GET request to the homepage');
        done(err);
      });
  });
});