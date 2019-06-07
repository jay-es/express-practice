import { Request, Response, NextFunction } from 'express';
import commentModel from '../models/commentModel';
import postModel from '../models/postModel';

export default {
  async getPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    const conds: { userId?: number } = {};

    if (req.query.userId) {
      conds.userId = Number(req.query.userId);
    }

    const posts = await postModel.getPosts(conds);

    res.render('posts', {
      posts,
    });
  },
  async getPostById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const postId = Number(req.params.postId);
    const postData = await postModel.getPostById(postId);

    if (!postData.id) {
      next({ message: 'Not Found', status: 404 });
      return;
    }

    const comments = await commentModel.getCommentsByPostId(postId);

    res.render('post-detail', {
      postData,
      comments,
    });
  },
  async postCommentByPostId(req: Request, res: Response, next: NextFunction): Promise<void> {
    const postId = Number(req.params.postId);
    const { name, email, body } = req.body;

    try {
      await commentModel.postComment(postId, name, email, body);
      res.redirect('.');
    } catch (e) {
      next({ message: e.message });
    }
  },
};
