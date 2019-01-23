const chance = require('chance').Chance();
const request = require('request');
const async = require('async');

function generateInfo() {
  return {
    animal: chance.animal(),
    city: chance.city(),
    hashtag: chance.hashtag()
  };
}

function buildSomething(animal, city, hashtag) {
  return {
    text: `${animal} from ${city} ${hashtag}`,
    animal, city, hashtag
  }
}

function getUrls(urls, callback) {
  const calls = urls.map((url) => {
    return (cb) => {
      request(url, (err, res) => {
        if (err) cb(err);
        cb(null, res.body);
      });
    }
  })
  async.series(calls, callback);
}

function delayedCallToUrl(url) {
  setTimeout(() => {
    request({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url,
      json: true,
      body: { done: true }
    });
  }, 2100);
}

module.exports = { buildSomething, generateInfo, getUrls, delayedCallToUrl };
