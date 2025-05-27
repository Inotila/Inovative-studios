const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  agree_to_terms_and_conditions: {
  type: Boolean,
  required: true,
}
});

module.exports = mongoose.model('User', UserSchema);
