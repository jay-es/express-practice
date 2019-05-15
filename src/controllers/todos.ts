import { Request, Response, NextFunction } from 'express';
import TodoModel from '../models/todosModel';

export default {
  async getTodos(req: Request, res: Response, next: NextFunction): Promise<void> {
    const conds: { userId?: number; completed?: boolean } = {};

    if (req.query.userId) {
      conds.userId = Number(req.query.userId);
    }

    if (req.query.completed) {
      conds.completed = !!Number(req.query.completed);
    }

    const todos = await TodoModel.find(conds, null, { sort: 'id' }).exec();

    res.render('todos', {
      todos,
    });
  },
  async getTodoById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const todoId = Number(req.params.todoId);
    const todo = await TodoModel.findOne({ id: todoId }).exec();

    if (!todo) {
      next({ message: 'No ToDo Found' });
      return;
    }

    res.render('todos', {
      todos: [todo],
    });
  },
};
