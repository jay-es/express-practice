import { Request, Response, NextFunction } from 'express';

export default {
  getIndex(req: Request, res: Response, next: NextFunction): void {
    res.render('index', { title: 'Express' });
  },
};
