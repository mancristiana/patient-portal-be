const User = require('../models').User;

module.exports.createUser = async function(req, res) {
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

  return responseSuccess(res, null);
};

/**
 * @api {get} /api/users Get User
 * @apiName get-user
 * @apiGroup users
 * @apiVersion 1.0.0
 *
 * @apiDescription This request returns a user from ID
 *
 * @apiSuccess (User Fields) {String} _id Unique Mongo generated id of the User.
 * @apiSuccess (User Fields) {String} email Email of the User.
 * @apiSuccess (User Fields) {int} nationalID NationalID of the User.
 * @apiSuccess (User Fields) {String} phone Phone of the User.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *       {
 *           "_id": "573ec098e85f5601f611322b",
 *           "Email": "preprem@gmail.com",
 *           "phone": "+45 27 29 29 64"
 *       },
 *       {
 *           "_id": "573ec098e85f5601f611322b",
 *           "Email": "dadasd@gmail.com",
 *           "phone": "+45 63 63 63 63"
 *       }
 *   ]
 *
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */

module.exports.getUser = async function(req, res) {
  let error, user;
  [user, error] = await to(User.findOne({ _id: req.userId }));
  if (error) {
    return responseError(res, error);
  }

  if (!user) {
    return responseError(res, { message: 'User was not found' }, 404);
  }

  return responseSuccess(res, user.getProfile());
};

module.exports.updateUser = async function(req, res) {
  let error, result;
  [result, error] = await to(
    User.update({ _id: req.userId }, { $set: req.body })
  );
  if (error) {
    return responseError(res, error);
  }

  if (result.n === 0) {
    return responseError(res, { message: 'User was not found' }, 404);
  }

  return responseSuccess(res, null);
};

module.exports.deleteUser = async function(req, res) {
  let error, result;
  [result, error] = await to(User.deleteOne({ _id: req.userId }));
  // User was not found
  if (error) {
    return responseError(res, error);
  }

  if (result.n === 0) {
    return responseError(res, { message: 'User was not found' }, 404);
  }

  return responseSuccess(res, null, 204);
};
