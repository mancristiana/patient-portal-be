const jwt = require('jsonwebtoken');
const User = require('../models').User;

module.exports.authenticate = function(req, res, next) {
  let authHeader = req.get('Authorization');
  if (!authHeader) {
    return responseError(res, { message: 'Unauthorized' }, 401);
  }
  // console.log(authHeader);
  let token = authHeader.replace('Bearer ', '');
  //console.log(token);
  let result = User.verifyJWT(token);

  if (!result.success) {
    return responseError(res, { message: result.error }, 401);
  }

  next();
};

const getJWT = function(userId) {
  console.log('ID', userId);
  let token = jwt.sign({ user_id: userId }, CONFIG.JWT_SECRET, {
    algorithm: CONFIG.JWT_ENCRYPTION,
    expiresIn: CONFIG.JWT_EXPIRATION
  });
  console.log('TOKO chan', token);
  return token;
};
module.exports.getJWT = getJWT;

const verifyJWT = function(token) {
  try {
    let user = jwt.verify(token, CONFIG.JWT_SECRET);
    console.log('TOKO payload', user);
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
