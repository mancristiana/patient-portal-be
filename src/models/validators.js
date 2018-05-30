const validate = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');
const {
  validateNorwegianIdNumber
} = require('norwegian-national-id-validator');

module.exports.uniqueValidator = uniqueValidator;

// See: https://github.com/leepowellcouk/mongoose-validator
// See: https://github.com/chriso/validator.js/#validators
module.exports.email = [
  validate({
    validator: 'isEmail',
    message: 'Email is not valid'
  })
];

module.exports.phone = [
  validate({
    validator: 'isNumeric',
    message: 'Phone should contain only numbers'
  }),
  validate({
    validator: 'isLength',
    arguments: [8, 8],
    message: 'Phone should have {ARGS[0]} numbers'
  })
];

module.exports.nationalId = [
  validate({
    validator: 'isNumeric',
    message: 'Norwegian National ID must be a numeric value'
  }),

  validate({
    validator: 'isLength',
    arguments: [11, 11],
    message: 'Norwegian National ID should have {ARGS[0]} numbers'
  }),

  // See: https://github.com/mikaello/norwegian-national-id-validator
  validate({
    validator: validateNorwegianIdNumber,
    message: 'Norwegian National ID is not valid'
  })
];
