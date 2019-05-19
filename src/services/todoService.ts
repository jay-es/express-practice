import TodoModel, { Todo } from '../models/TodoModel';

export default {
  async getTodos(conds?: { userId?: number; completed?: boolean }): Promise<Todo[]> {
    const todos = await TodoModel.find(conds, null, { sort: 'id' }).exec();

    return todos;
  },
  async getTodoById(todoId: number): Promise<Todo> {
    const result = await TodoModel.findOne({ id: todoId }).exec();

    if (!result) {
      throw new Error('No ToDos Found');
    }

    return result._doc;
  },
};
