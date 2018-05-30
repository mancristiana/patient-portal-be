const User = require('../models').User;

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

  response = user.toWeb();
  response.jwt = user.getJWT();

  return responseSuccess(res, response);
};
module.exports.register = register;

const login = async function(req, res) {};
module.exports.login = login;
