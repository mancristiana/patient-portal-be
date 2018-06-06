const mongoose = require('mongoose');

let specialitySchema = mongoose.Schema({
  name: String
});

specialitySchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Speciality', specialitySchema);
