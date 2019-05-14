import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  completed: Boolean,
});

export default mongoose.models.todo || mongoose.model('todo', todoSchema);
