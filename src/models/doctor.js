const mongoose = require('mongoose');
const validate = require('./validators');
const helpers = require('./helpers');

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

doctorSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

doctorSchema.methods.toText = function() {
  return this.name + this.clinic + this.address + this.speciality.name;
};

doctorSchema.methods.filterByQuery = function(query) {
  const matches = helpers.matches;
  const text = this.toText();

  if (typeof query === 'string') {
    return matches(text, query);
  }

  if (Array.isArray(query)) {
    let matched = query.filter(item => matches(text, item));
    return matched.length > 0;
  }
};

// Create the model for users and expose it to our app
module.exports = mongoose.model('Doctor', doctorSchema);
