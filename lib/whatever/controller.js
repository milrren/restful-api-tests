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
    return res.sendStatus(401);
  }

  res.send(service.buildSomething(animal, city, hashtag));
};

function getMoreThanAnything(req, res) {
  const { quantity } = req.params;
  const response = { things: [] };
  for (var i = 0; i < quantity; i++) {
    const { animal, city, hashtag } = service.generateInfo();
    response.things.push(service.buildSomething(animal, city, hashtag));
  }
  res.send(response);
};

function getAnythingWithParameters(req, res) {
  const { animal, city, hashtag } = req.body;

  if (!animal) {
    return res.status(400).send('Missing property: animal');
  }

  if (!city) {
    return res.status(400).send('Missing property: city');
  }

  if (!hashtag) {
    return res.status(400).send('Missing property: hashtag');
  }

  res.send(service.buildSomething(animal, city, hashtag));
};

function getContentFromUrls(req, res) {
  const { urls, callbackUrl } = req.body;

  if (!urls) {
    return res.status(400).send('Missing property: url');
  }

  service.getUrls(urls, (err, responses) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    
    res.send(responses);
    if (callbackUrl) {
      service.delayedCallToUrl(callbackUrl);
    }
  });
};

module.exports = {
  getNothing,
  getSomething,
  getAnything,
  getMoreThanAnything,
  getAnythingWithParameters,
  getContentFromUrls
};
