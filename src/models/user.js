const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validate = require('./validators');

// See: https://www.owasp.org/index.php/Password_Storage_Cheat_Sheet
const argonOptions = {
  timeCost: CONFIG.ARGON_TIMECOST,
  memoryCost: CONFIG.ARGON_MEMORY,
  parallelism: CONFIG.ARGON_PARALLELISM,
  type: argon2.argon2id
};

let userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: validate.email,
    unique: true
  },
  password: { type: String, required: true },
  name: { type: String, required: true },
  nationalId: {
    type: String,
    required: true,
    validate: validate.nationalId,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    validate: validate.phone,
    unique: true
  },
  address: { type: String, required: true }
});
userSchema.plugin(validate.uniqueValidator);

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await this.hashPassword(this.password);
  } else {
    return next();
  }
});

// Generate and return the hash for a given password
userSchema.methods.hashPassword = async function(password) {
  let hash, error;
  [hash, error] = await to(argon2.hash(password, argonOptions));
  if (error) {
    throwError(`User.hashPassword Error: ${error}`, true);
  } else {
    return hash;
  }
};

// Check if password matches the password in the database
userSchema.methods.verifyPassword = async function(password) {
  const hash = this.local.password;
  let match, error;
  [match, error] = await to(argon2.verify(hash, password));
  if (error) {
    throwError(`User.verifyPassword Error: ${error}`, true);
  }
  return match;
};

userSchema.methods.getJWT = function() {
  return jwt.sign({ user_id: this._id }, CONFIG.JWT_ENCRYPTION, {
    expiresIn: CONFIG.JWT_EXPIRATION
  });
};

userSchema.methods.toWeb = function() {
  let json = {};
  json.name = this.name;
  return json;
};

// Create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
