const jwt = require('jsonwebtoken');
const User = require('../models').User;
const { hasFields } = require('./../utils/requestValidator');

module.exports.login = async function(req, res) {
  if (!hasFields(req, ['email', 'password'])) {
    return responseError(
      res,
      { message: 'Make sure email and passoword are specified.' },
      400
    );
  }

  let error, user, correct, response;
  [user, error] = await to(User.findOne({ email: req.body.email }));
  // User was not found
  if (error) {
    return responseError(
      res,
      { message: 'Provided credentials are incorrect' },
      401
    );
  }
  [correct, error] = await to(user.verifyPassword(req.body.password));
  if (!correct) {
    return responseError(
      res,
      { message: 'Provided credentials are incorrect' },
      401
    );
  }
  response = { jwt: getJWT(user._id) };
  return responseSuccess(res, response);
};

module.exports.authorize = async function(req, res, next) {
  let authHeader = req.get('Authorization');
  if (!authHeader) {
    return responseError(res, null, 401);
  }

  let token = authHeader.replace('Bearer ', '');

  let result = verifyJWT(token);

  if (!result.success) {
    return responseError(res, { message: result.error }, 401);
  }

  // Make sure that the user exists
  let userId = result.payload.id;
  let error, user;
  [user, error] = await to(User.findOne({ _id: userId }));
  if (error || !user) {
    return responseError(res, null, 401);
  }

  // Send the user and id to the next middleware on the express stack
  req.userId = userId;
  req.user = user;
  next();
};

const getJWT = function(userId) {
  let token = jwt.sign({ id: userId }, CONFIG.JWT_SECRET, {
    algorithm: CONFIG.JWT_ENCRYPTION,
    expiresIn: CONFIG.JWT_EXPIRATION
  });
  return token;
};
module.exports.getJWT = getJWT;

const verifyJWT = function(token) {
  try {
    let user = jwt.verify(token, CONFIG.JWT_SECRET);
    return {
      success: true,
      payload: user
    };
  } catch (e) {
    return {
      success: false,
      error: e.message
    };
  }
};
module.exports.verifyJWT = verifyJWT;
