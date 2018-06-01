const Doctor = require('../models').Doctor;

const regex = function(value) {
  return new RegExp(`.*${value}.*`, 'i');
};

module.exports.search = async function(req, res) {
  const queryParam = req.param('query');
  const cityParam = req.param('city');
  const specialityParam = req.param('speciality');

  let findOptions = {};
  Object.assign(
    findOptions,
    queryParam ? { name: regex(queryParam) } : null,
    cityParam ? { address: regex(cityParam) } : null
  );

  let error, doctors;
  [doctors, error] = await to(
    Doctor.find(findOptions)
      .populate({ path: 'speciality', select: 'name' })
      .exec()
  );
  if (error) {
    return responseError(res, error);
  }

  if (specialityParam) {
    doctors = doctors.filter(doctor =>
      doctor.speciality.name.match(regex(specialityParam))
    );
  }

  return responseSuccess(res, doctors);
};

module.exports.getDoctor = async function(req, res) {
  const doctorId = req.param('id');
  let error, doctor;
  [doctor, error] = await to(
    Doctor.findOne({ _id: doctorId })
      .populate({ path: 'speciality', select: 'name' })
      .exec()
  );
  if (error) {
    return responseError(res, error);
  }

  if (!doctor) {
    return responseError(res, { message: 'Doctor was not found' }, 404);
  }

  return responseSuccess(res, doctor);
};
