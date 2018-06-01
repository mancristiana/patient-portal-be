const express = require('express');
const router = express.Router();

const {
  SpecialitiesController,
  UsersController,
  AuthController
} = require('./../controllers');
const auth = AuthController.authenticate;

router.route('/api/users').post(UsersController.register);
router.route('/api/users/login').post(UsersController.login);

router.route('/api/users').get(auth, UsersController.getUser);
//.put(UsersController.updateUser)
//.delete(UsersController.deleteUser);

router.route('/api/specialities').get(SpecialitiesController.getAll);

router.use(express.static('./public'));

module.exports = router;
