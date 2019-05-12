const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  username: String,
  email: String,
});

module.exports = mongoose.model('user', userSchema);
