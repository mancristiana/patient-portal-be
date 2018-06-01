const express = require('express');
const router = express.Router();

const {
  SpecialitiesController,
  UsersController,
  AuthController
} = require('./../controllers');
const auth = AuthController.authenticate;

router.route('/auth').post(AuthController.login);

router
  .route('/api/users')
  .post(UsersController.createUser)
  .get(auth, UsersController.getUser)
  .put(auth, UsersController.updateUser)
  .delete(auth, UsersController.deleteUser);

router.route('/api/specialities').get(SpecialitiesController.getAll);

router.use(express.static('./public'));

module.exports = router;
