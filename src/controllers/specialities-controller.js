const Speciality = require('../models').Speciality;
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
