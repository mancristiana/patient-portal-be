const express = require('express');
const router = express.Router();

const {
  SpecialitiesController,
  UsersController,
  AuthController,
  DoctorsController
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

router.route('/api/doctors').get(DoctorsController.search);
router.route('/api/doctors/:id').get(DoctorsController.getDoctor);
//router.route('/api/doctors/:id/timeslots').get(DoctorsController.getTimeslots);

router.use(express.static('./public'));

module.exports = router;
