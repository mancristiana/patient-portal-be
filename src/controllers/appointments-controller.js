const { Appointment, Doctor } = require('../models');

/**
 * @api {get} api/doctor/:id/timeslots Get Doctor Timeslots
 * @apiName get-doctor-timeslots
 * @apiGroup Doctors
 * @apiVersion 1.0.0
 *
 * @apiDescription This endpoint returns the available timeslots of doctors with the specified unique id.
 *
 * @apiParam {String} id       Doctor's unique id.
 *
 * @apiSuccess (Success 2xx) 200 OK
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "data": [
 *         {
 *             "_id": "5b1281723924ee271838b4ce",
 *             "doctor": "5afde7ec734d1d7d453ec63c",
 *             "time": "03-06-2018 10:00",
 *             "duration": 30,
 *             "patient": null,
 *             "description": ""
 *         },
 *         {
 *             "_id": "5b1281723924ee271838b4cf",
 *             "doctor": "5afde7ec734d1d7d453ec63c",
 *             "time": "03-06-2018 10:30",
 *             "duration": 30,
 *             "patient": null,
 *             "description": ""
 *         }
 *     ]
 * }
 *
 * @apiError (Error 4xx) 404 Doctor was not found.
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */
module.exports.getTimeslots = async function(req, res) {
  let error, doctor, timeslots, findOptions;
  const doctorId = req.param('id');
  [doctor, error] = await to(Doctor.findOne({ _id: doctorId }));
  if (error) {
    return responseError(res, error);
  }
  if (!doctor) {
    return responseError(res, { message: 'Doctor was not found' }, 404);
  }

  findOptions = {
    patient: null,
    doctor: doctor._id
  };
  [timeslots, error] = await to(Appointment.find(findOptions));

  if (error) {
    return responseError(res, error);
  }

  return responseSuccess(res, timeslots);
};

/**
 * @api {get} api/appointments Get All Appointments
 * @apiName get-all-appointment
 * @apiGroup Appointments
 * @apiVersion 1.0.0
 *
 * @apiDescription This endpoint allows an authenticated patient to see all of their own appointments.
 *
 * This resource is protected. Therefore, you must include <code>Authorization: Bearer token</code> header.
 * @apiHeader (Authorization Header) {String="Bearer :token"} Authorization Replace <code>:token</code> with supplied Auth Token
 *
 * @apiSuccess (Success 2xx) 200 OK
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "data": [
 *         {
 *             "_id": "5b1281723924ee271838b4d1",
 *             "doctor": {
 *                 "_id": "5afde7ec734d1d7d453ec63c",
 *                 "name": "Michael Bertson",
 *                 "speciality": {
 *                     "_id": "5afec038c10c3f372c71cdf2",
 *                     "name": "Acupuncturists"
 *                 },
 *                 "clinic": "Nova",
 *                 "address": "Ragnagade 7, 2100 København",
 *                 "phone": "70228190"
 *             },
 *             "time": "03-06-2018 11:30",
 *             "duration": 30,
 *             "patient": "5b11704ac5e43601680d381d",
 *             "description": ""
 *         }
 *     ]
 * }
 * 
 * @apiError (Error 4xx) 401 Unauthorized
 * @apiError (Error 4xx) 404 No appointments were found
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */
module.exports.getAll = async function(req, res) {
  let appointments, error;
  [appointments, error] = await to(
    Appointment.find({
      patient: req.userId
    })
      .populate({ path: 'doctor', populate: { path: 'speciality' } })
      .exec()
  );

  if (error) {
    return responseError(res, error);
  }

  if (!appointments || appointments.length === 0) {
    return responseError(
      res,
      { message: 'No appointments were found.' },
      404
    );
  }

  return responseSuccess(res, appointments);
};

/**
 * @api {get} api/appointments/:id Get Appointment By Id
 * @apiName get-appointment-by-id
 * @apiGroup Appointments
 * @apiVersion 1.0.0
 *
 * @apiDescription This endpoint allows an authenticated patient to select and view a single appointment from their own list of appointments.
 *
 * This resource is protected. Therefore, you must include <code>Authorization: Bearer token</code> header.
 * @apiHeader (Authorization Header) {String="Bearer :token"} Authorization Replace <code>:token</code> with supplied Auth Token
 * 
 * @apiParam {String} id Appointment's unique id.
 * 
 * @apiSuccess (Success 2xx) 200 OK
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "data": {
 *         "_id": "5b1281723924ee271838b4d1",
 *         "doctor": {
 *             "_id": "5afde7ec734d1d7d453ec63c",
 *             "name": "Michael Bertson",
 *             "speciality": {
 *                 "_id": "5afec038c10c3f372c71cdf2",
 *                 "name": "Acupuncturists"
 *             },
 *             "clinic": "Nova",
 *             "address": "Ragnagade 7, 2100 København",
 *             "phone": "70228190"
 *         },
 *         "time": "03-06-2018 11:30",
 *         "duration": 30,
 *         "patient": "5b11704ac5e43601680d381d",
 *         "description": ""
 *     }
 * }
 * 
 * @apiError (Error 4xx) 401 Unauthorized
 * @apiError (Error 4xx) 404 Appointment was not found
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */
module.exports.getAppointment = async function(req, res) {
  let appointment, error;
  [appointment, error] = await to(
    Appointment.findOne({
      patient: req.userId,
      _id: req.param('id')
    })
      .populate({ path: 'doctor', populate: { path: 'speciality' } })
      .exec()
  );

  if (error) {
    return responseError(res, error);
  }

  if (!appointment) {
    return responseError(res, { message: 'Appointment was not found' }, 404);
  }

  return responseSuccess(res, appointment);
};

/**
 * @api {post} api/appointments/:id Book Appointment
 * @apiName book-appointment
 * @apiGroup Appointments
 * @apiVersion 1.0.0
 *
 * @apiDescription This request books an appointment from the available timeslots for the authenticated patient. The appointment details such as time, address and doctor are preset. To read more about getting all available timeslots, see: <a href="#api-Doctors-get_doctor_timeslots">Get Doctor Timeslots</a>
 *
 * This resource is protected. Therefore, you must include <code>Authorization: Bearer token</code> header.
 *
 * @apiHeader (Authorization Header) {String="Bearer :token"} Authorization Replace <code>:token</code> with supplied Auth Token
 *
 * @apiParam {String} id Unique id of a free timeslot listed under a selected doctor. To read more about getting all available timeslots, see: <a href="#api-Doctors-get_doctor_timeslots">Get Doctor Timeslots</a>
 *
 * @apiSuccess (Success 2xx) 200 User was successfully created
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "success": true
 * }
 *
 * @apiError (Error 4xx) 401 Unauthorized
 * @apiError (Error 4xx) 404 Appointment not found
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */

module.exports.createAppointment = async function(req, res) {
  let result, error;
  [result, error] = await to(
    Appointment.findOneAndUpdate(
      { _id: req.params.id, patient: null },
      { patient: req.userId }
    )
  );

  if (error) {
    return responseError(res, error);
  }

  if (!result) {
    return responseError(res, { message: 'Appointment was not found' }, 404);
  }

  return responseSuccess(res, null);
};

/**
 * @api {put} api/appointments/:id Update Appointment
 * @apiName update-appointment
 * @apiGroup Appointments
 * @apiVersion 1.0.0
 *
 * @apiDescription An autorized patient can update the description of their own appointments to include symptoms or send a message to the doctor or clinic.
 * This resource is protected. Therefore, you must include <code>Authorization: Bearer token</code> header.
 *
 * @apiHeader (Authorization Header) {String="Bearer :token"} Authorization Replace <code>:token</code> with supplied Auth Token
 * @apiParamExample {json} Update account
 * {
 *	"description": "This is a message from patient to doctor."
 * }
 * 
 * @apiSuccess (Success 2xx) 200 OK Appointment was successfully updated
 * @apiError (Error 4xx) 401 Unauthorized
 * @apiError (Error 4xx) 404 Appointment was not found
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */
module.exports.updateAppointment = async function(req, res) {
  let description = req.body.description || '';
  let result, error;
  [result, error] = await to(
    Appointment.findOneAndUpdate(
      { _id: req.params.id, patient: req.userId },
      { description: description }
    )
  );

  if (error) {
    return responseError(res, error);
  }

  if (!result) {
    return responseError(res, { message: 'Appointment was not found' }, 404);
  }

  return responseSuccess(res, null);
};

/**
 * @api {delete} api/appointments/:id Cancel Appointment
 * @apiName cancel-appointment
 * @apiGroup Appointments
 * @apiVersion 1.0.0
 *
 * @apiDescription This endpoint allow an authorized patient to delete an appointment. In this case the appointment becomes an available timeslot in the doctor's calendar.
 *
 * This resource is protected. Therefore, you must include <code>Authorization: Bearer token</code> header.
 * @apiHeader (Authorization Header) {String="Bearer :token"} Authorization Replace <code>:token</code> with supplied Auth Token
 *
 * @apiSuccess (Success 2xx) 200 OK Appointment was successfully deleted
 * @apiError (Error 4xx) 401 Unauthorized
 * @apiError (Error 4xx) 404 Appointment was not found
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 *
 */
module.exports.deleteAppointment = async function(req, res) {
  let result, error;
  [result, error] = await to(
    Appointment.findOneAndUpdate(
      { _id: req.params.id, patient: req.userId },
      { patient: null, description: '' }
    )
  );

  if (error) {
    return responseError(res, error);
  }

  if (!result) {
    return responseError(res, { message: 'Appointment was not found' }, 404);
  }

  return responseSuccess(res, null, 200);
};
