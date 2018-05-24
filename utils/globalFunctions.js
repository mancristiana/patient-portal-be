const parseError = require('parse-error'); //parses error so you can read error message and handle them accordingly

to = function(promise) {
  //global function that will help use handle promise rejections, this article talks about it http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(error => [parseError(error)]);
};

ThrowError = function(err_message, log) {
  if (log === true) {
    console.error(err_message);
  }

  throw new Error(err_message);
};

// Error Web Response
ResponseError = function(res, err, code) {
  if (typeof err == 'object' && typeof err.message != 'undefined') {
    err = err.message;
  }

  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json({ success: false, error: err });
};

// Success Web Response
ResponseSuccess = function(res, data, code) {
  let send_data = { success: true };

  if (typeof data == 'object') {
    send_data = Object.assign(data, send_data); //merge the objects
  }

  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json(send_data);
};

// Handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
  console.error('Uncaught Error', parseError(error));
});
