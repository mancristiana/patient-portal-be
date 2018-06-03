const Doctor = require('../models').Doctor;

const regex = function(value) {
  return new RegExp(`.*${value}.*`, 'i');
};

/**
 * @api {get} api/doctors Search Doctors
 * @apiName search-doctors
 * @apiGroup Doctors
 * @apiVersion 1.0.0
 *
 * @apiDescription This endpoint returns a list of doctors satisfying the search filters and queries specified in the request.
 *
 * @apiParam {String} [query]       Doctor's name.
 * @apiParam {String} [city]        City or any part of the address.
 * @apiParam {String} [speciality]  Doctor's speciality
 *
 * @apiSuccess (Success 2xx) 200 OK
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "data": [
 *        {
 *            "_id": "5b1294ec3924ee271838b530",
 *            "name": "John Doe",
 *            "speciality": {
 *                "_id": "5afec038c10c3f372c71cdf3",
 *                "name": "Allergists"
 *            },
 *            "clinic": "Lege",
 *            "address": "Stranden 89, 0250 Oslo Norway",
 *            "phone": "94161140"
 *        }
 *    ]
 * }
 *
 * @apiError (Error 4xx) 404 No doctors were found. Please adjust your search query.
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */
module.exports.search = async function(req, res) {
  const queryParam = req.params.query;
  const cityParam = req.params.city;
  const specialityParam = req.params.speciality;

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

  if (!doctors || doctors.length === 0) {
    return responseError(
      res,
      { message: 'No doctors were found. Please adjust your search query.' },
      404
    );
  }

  return responseSuccess(res, doctors);
};

/**
 * @api {get} api/doctor/:id Get Doctor by Id
 * @apiName get-doctor-by-id
 * @apiGroup Doctors
 * @apiVersion 1.0.0
 *
 * @apiDescription This endpoint returns the doctors with the specified unique id.
 *
 * @apiParam {String} id       Doctor's unique id.
 *
 * @apiSuccess (Success 2xx) 200 OK
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "data": {
 *        "_id": "5b1294ec3924ee271838b530",
 *        "name": "John Doe",
 *        "speciality": {
 *            "_id": "5afec038c10c3f372c71cdf3",
 *            "name": "Allergists"
 *        },
 *        "clinic": "Lege",
 *        "address": "Stranden 89, 0250 Oslo Norway",
 *        "phone": "94161140"
 *    }
 * }
 *
 * @apiError (Error 4xx) 404 Doctor was not found.
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 */

module.exports.getDoctor = async function(req, res) {
  const doctorId = req.params.id;
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
