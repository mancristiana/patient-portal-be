const User = require('../models').User;
const { hasFields } = require('./../utils/requestValidator');
const AuthController = require('./auth-controller');

const register = async function(req, res) {
  let error, user, response;
  const newUser = new User(req.body);
  [user, error] = await to(newUser.save());
  if (error) {
    if (error.type === 'ValidationError') {
      if (error.message.includes('unique')) {
        return responseError(
          res,
          {
            message:
              'Conflict registering new user. User email, phone and national Id must be unique'
          },
          409
        );
      }
      return responseError(res, error, 400);
    }
    return responseError(res, error);
  }

  response = { jwt: AuthController.getJWT(user._id) };

  return responseSuccess(res, response);
};
module.exports.register = register;

const login = async function(req, res) {
  if (!hasFields(req, ['email', 'password'])) {
    return responseError(res, null, 400);
  }

  let error, user, correct, response;
  [user, error] = await to(User.findOne({ email: req.body.email }));
  // User was not found
  if (error) {
    return responseError(res, null, 401);
  }
  [correct, error] = await to(user.verifyPassword(req.body.password));
  if (!correct) {
    return responseError(res, null, 401);
  }
  response = { jwt: AuthController.getJWT(user._id) };
  return responseSuccess(res, response);
};
module.exports.login = login;
