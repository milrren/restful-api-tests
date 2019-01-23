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
      request(url, cb);
    }
  })
  async.parallel(calls, callback);
}

function delayedCallToUrl(url) {
  setTimeout(() => {
    request.post(url, { done: true });
  }, 2000);
}

module.exports = { buildSomething, generateInfo, getUrls, delayedCallToUrl };
