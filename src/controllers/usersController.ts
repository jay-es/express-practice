import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';

export default {
  async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    const users = await userService.getUsers();

    res.render('users', {
      users,
    });
  },
  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = Number(req.params.userId);

    try {
      const result = await userService.getUserById(userId);
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
    } catch (e) {
      next({ message: e.message });
    }
  },
};
