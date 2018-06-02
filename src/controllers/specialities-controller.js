const Speciality = require('../models').Speciality;

/**
 * @api {get} api/specialities Get All Specialities
 * @apiName get-all-specialities
 * @apiGroup Specialities
 * @apiVersion 1.0.0
 *
 * @apiDescription This request returns a list of all Specialities.
 *
 * @apiSuccess (Speciality Fields) {String} _id Unique Mongo generated id of the Speciality.
 * @apiSuccess (Speciality Fields) {String} name id of the Speciality.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "success": true,
 *     "data": [
 *         {
 *             "id": "5afec038c10c3f372c71cdf2",
 *             "name": "Acupuncturists"
 *         },
 *         {
 *             "id": "5afec038c10c3f372c71cdf3",
 *             "name": "Allergists"
 *         },
 *         {
 *             "id": "5afec038c10c3f372c71cdf4",
 *             "name": "Audiologists"
 *         }
 *      ]
 *   }
 *
 * @apiError (Error 5xx) 500 Internal Server Error
 */

const getAll = async function(req, res) {
  let error, specialities;
  [specialities, error] = await to(Speciality.find());

  if (error) {
    return responseError(res, error);
  }

  let specialitiesJson = specialities.map(speciality => speciality.toWeb());

  return responseSuccess(res, specialitiesJson);
};
module.exports.getAll = getAll;
