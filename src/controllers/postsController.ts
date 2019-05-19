import { Request, Response, NextFunction } from 'express';
import commentService from '../services/commentService';
import postService from '../services/postService';

export default {
  async getPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    const conds: { userId?: number } = {};

    if (req.query.userId) {
      conds.userId = Number(req.query.userId);
    }

    const posts = await postService.getPosts(conds);

    res.render('posts', {
      posts,
    });
  },
  async getPostById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const postId = Number(req.params.postId);

    try {
      const postData = await postService.getPostById(postId);
      const comments = await commentService.getCommentsByPostId(postId);
      res.render('post-detail', {
        postData,
        comments,
      });
    } catch (e) {
      next({ message: e.message });
    }
  },
  async postCommentByPostId(req: Request, res: Response, next: NextFunction): Promise<void> {
    const postId = Number(req.params.postId);
    const { name, email, body } = req.body;

    try {
      await commentService.postCommentByPostId(postId, name, email, body);
      res.redirect('.');
    } catch (e) {
      next({ message: e.message });
    }
  },
};
