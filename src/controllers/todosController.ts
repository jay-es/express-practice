import { Request, Response, NextFunction } from 'express';
import todoService from '../services/todoService';

export default {
  async getTodos(req: Request, res: Response, next: NextFunction): Promise<void> {
    const conds: { userId?: number; completed?: boolean } = {};

    if (req.query.userId) {
      conds.userId = Number(req.query.userId);
    }

    if (req.query.completed) {
      conds.completed = !!Number(req.query.completed);
    }

    const todos = await todoService.getTodos(conds);

    res.render('todos', {
      todos,
    });
  },
  async getTodoById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const todoId = Number(req.params.todoId);

    try {
      const todo = await todoService.getTodoById(todoId);

      res.render('todos', {
        todos: [todo],
      });
    } catch (e) {
      next({ message: e.message });
    }
  },
};
