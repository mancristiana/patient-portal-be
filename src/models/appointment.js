const mongoose = require('mongoose');
const validate = require('./validators');

let appointmentSchema = mongoose.Schema({
  description: { type: String },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Doctor'
  },
  duration: { type: Number, required: true },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User'
  },
  time: { type: String, validate: validate.dateTime }
});

appointmentSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

// Create the model for users and expose it to our app
module.exports = mongoose.model('Appointment', appointmentSchema);
