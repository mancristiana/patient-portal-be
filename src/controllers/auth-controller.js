const jwt = require('jsonwebtoken');

module.exports.authenticate = function(req, res, next) {
  let authHeader = req.get('Authorization');
  if (!authHeader) {
    return responseError(res, { message: 'Unauthorized' }, 401);
  }

  let token = authHeader.replace('Bearer ', '');

  let result = verifyJWT(token);

  if (!result.success) {
    return responseError(res, { message: result.error }, 401);
  }

  req.userId = result.payload.id;
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
