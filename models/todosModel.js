const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  completed: Boolean,
});

module.exports = mongoose.model('todo', todoSchema);
