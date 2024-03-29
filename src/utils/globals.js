// See: https://medium.com/front-end-hacking/error-handling-in-node-javascript-suck-unless-you-know-this-2018-aa0a14cfdd9d
// See: http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/

const parseError = require('parse-error'); // Parses error so you can read error message and handle them accordingly
const getErrorMessage = require('./errorMessages');
// Global function that handles promise rejections
to = function(promise) {
  return promise
    .then(data => {
      return [data, null];
    })
    .catch(error => [null, parseError(error)]);
};

throwError = function(errorMessage, log) {
  if (log === true) {
    console.error(errorMessage);
  }

  throw new Error(errorMessage);
};

// Error Web Response
responseError = function(res, err, code) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = code || 500;

  let errorMessage = err && err.message ? err.message : '';
  errorMessage = getErrorMessage(res.statusCode) + errorMessage;

  let result = {
    success: false,
    error: errorMessage
  };

  return res.json(result);
};

// Success Web Response
responseSuccess = function(res, data, code) {
  let result = {
    success: true
  };
  if (data) {
    result.data = data;
  }

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = code || 200;

  return res.json(result);
};

// Handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
  console.error('Uncaught Error', parseError(error));
});
