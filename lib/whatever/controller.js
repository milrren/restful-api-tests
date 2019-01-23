const service = require('./service');

function getNothing(req, res) {
  res.send('GET to the whatever API');
};

function getSomething(req, res) {
  res.send(req.params);
};

function getAnything(req, res) {
  const { animal, city, hashtag } = service.generateInfo();

  if (animal === 'Horse') {
    res.sendStatus(401);
  }

  res.send(service.buildSomething(animal, city, hashtag));
};

function getAnythingWithParameters(req, res) {
  const { animal, city, hashtag } = res.body;

  if (!animal || !city || !hashtag) {
    res.status(400).send('Missing property: animal');
  }

  if (!city) {
    res.status(400).send('Missing property: city');
  }

  if (!hashtag) {
    res.status(400).send('Missing property: hashtag');
  }

  res.send(service.buildSomething(animal, city, hashtag));
};

function getContentFromUrls(req, res) {
  const { urls, callbackUrl } = req.body;

  if (!urls) {
    res.status(400).send('Missing property: url');
  }

  service.getUrls(urls, (err, responses) => {
    if (err) {
      res.status(400).send(err.message);
    }

    res.send(responses.map((e) => e.body));
    if (callbackUrl) {
      service.delayedCallToUrl(callbackUrl);
    }
  });
}

module.exports = {
  getNothing,
  getSomething,
  getAnything,
  getAnythingWithParameters,
  getContentFromUrls
};