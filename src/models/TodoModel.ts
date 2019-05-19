import mongoose from 'mongoose';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const todoSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  completed: Boolean,
});

export default mongoose.models.Todo || mongoose.model('Todo', todoSchema);
