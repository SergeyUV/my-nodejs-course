const logger = require('../logger/logger.service');

const errHandler = (err, req, res, next) => {
  logger.logError(`${err.status} ${err.send}`);

  res.status(err.status);
  if (err.send) {
    res.send(err.send);
  } else if (err.data) {
    res.json(err.data);
  } else {
    res.send('Err!');
  }
  // next(err);
};

module.exports = { errHandler };
