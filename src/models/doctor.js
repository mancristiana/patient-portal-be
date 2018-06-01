const mongoose = require('mongoose');
const validate = require('./validators');

let doctorSchema = mongoose.Schema({
  name: { type: String, required: true },
  speciality: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Speciality'
  },
  clinic: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    validate: validate.phone
  },
  address: { type: String, required: true }
});

doctorSchema.methods.toWeb = function() {
  return {
    name: this.name,
    phone: this.phone,
    address: this.address
  };
};

// Create the model for users and expose it to our app
module.exports = mongoose.model('Doctor', doctorSchema);
