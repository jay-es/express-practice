import mongoose from 'mongoose';

export interface Todo extends mongoose.Document {
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

export default (mongoose.models.Todo as mongoose.Model<Todo>) ||
  mongoose.model<Todo>('Todo', todoSchema);
