import { Request, Response, NextFunction } from 'express';
import userModel from '../models/userModel';

export default {
  async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    const users = await userModel.getUsers();

    res.render('users', {
      users,
    });
  },
  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = Number(req.params.userId);
    const result = await userModel.getUserById(userId);

    if (!result.id) {
      next({ message: 'Not Found', status: 404 });
      return;
    }

    const userData: { [k: string]: string } = {};

    Object.entries(result).forEach(([key, val]) => {
      if (val.toString() !== '[object Object]') {
        userData[key] = val;
        return;
      }

      // 値がオブジェクトの場合、文字列に変換
      userData[key] = Object.entries(val)
        .filter(([k, v]) => typeof v === 'string') // geo 除外
        .map(([k, v]) => `${k}: ${v}`)
        .join('<br>');
    });

    res.render('users-detail', {
      userData,
    });
  },
};
