const mongoose = require('mongoose');

let specialitySchema = mongoose.Schema({
  name: String
});

specialitySchema.methods.toWeb = function() {
  //let json = this.toJSON();
  let json = {};
  json.id = this._id; //this is for the front end
  json.name = this.name;
  return json;
};

module.exports = mongoose.model('Speciality', specialitySchema);
