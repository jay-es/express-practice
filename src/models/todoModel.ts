import mongoose from 'mongoose';

interface Todo extends mongoose.Document {
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

export const Model: mongoose.Model<Todo> =
  mongoose.models.Todo || mongoose.model('Todo', todoSchema);

export default {
  async getTodos(conds?: { userId?: number; completed?: boolean }): Promise<Todo[]> {
    const todos = await Model.find(conds, null, { sort: 'id' }).exec();
    return todos;
  },
  async getTodoById(todoId: number): Promise<Todo> {
    const result = await Model.findOne({ id: todoId }).exec();
    return result ? result.toObject() : new Model();
  },
};
