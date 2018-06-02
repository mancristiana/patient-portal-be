const express = require('express');
const router = express.Router();

const {
  AppointmentsController,
  AuthController,
  DoctorsController,
  SpecialitiesController,
  UsersController
} = require('./../controllers');

const auth = AuthController.authorize;

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

router
  .route('/api/doctors/:id/timeslots')
  .get(AppointmentsController.getTimeslots);

router.route('/api/appointments').get(auth, AppointmentsController.getAll);

router
  .route('/api/appointments/:id')
  .get(auth, AppointmentsController.getAppointment)
  .post(auth, AppointmentsController.createAppointment)
  .put(auth, AppointmentsController.updateAppointment)
  .delete(auth, AppointmentsController.deleteAppointment);

router.use(express.static('./public'));

module.exports = router;
