const { Appointment, Doctor } = require('../models');

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

  return responseSuccess(res, appointments);
};

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
