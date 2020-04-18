const loggerRepo = require('./logger.console.repository');

const logQery = req => {
  const { method, body, params } = req;
  const reqURL = `${method} ${req.protocol}://${req.headers.host}${req.baseUrl}`;
  const reqParams = `Params:${JSON.stringify(params)}`;
  const reqBody = `Body:${JSON.stringify(body)}`;

  loggerRepo.logMessage(`${reqURL} ${reqParams} ${reqBody}`);
};

const logError = err => {
  let errStr;
  if (err.reason) {
    errStr = `Error: ${err.reason}`;
  } else {
    errStr = err;
  }
  loggerRepo.logError(errStr);
};

module.exports = { logQery, logError };
