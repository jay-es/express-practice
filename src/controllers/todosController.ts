import { Request, Response, NextFunction } from 'express';
import todoModel from '../models/todoModel';

export default {
  async getTodos(req: Request, res: Response, next: NextFunction): Promise<void> {
    const conds: { userId?: number; completed?: boolean } = {};

    if (req.query.userId) {
      conds.userId = Number(req.query.userId);
    }

    if (req.query.completed) {
      conds.completed = !!Number(req.query.completed);
    }

    const todos = await todoModel.getTodos(conds);

    res.render('todos', {
      todos,
    });
  },
  async getTodoById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const todoId = Number(req.params.todoId);
    const todo = await todoModel.getTodoById(todoId);

    if (!todo.id) {
      next({ message: 'Not Found', status: 404 });
      return;
    }

    res.render('todos', {
      todos: [todo],
    });
  },
};
