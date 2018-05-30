const express = require('express');
const router = express.Router();

const { SpecialitiesController, UsersController } = require('./../controllers');

router.route('/api/users').post(UsersController.register);
router.route('/api/users/login').post(UsersController.login);

// // include auth
// router
//   .route('/api/users/:id')
//   .get(UsersController.getUser)
//   .put(UsersController.updateUser)
//   .delete(UsersController.deleteUser);

router.route('/api/specialities').get(SpecialitiesController.getAll);

router.use(express.static('./public'));

module.exports = router;
