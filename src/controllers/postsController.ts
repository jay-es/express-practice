import { Request, Response, NextFunction } from 'express';
import CommentModel from '../models/commentsModel';
import PostModel from '../models/postsModel';

export default {
  async getPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    const conds: { userId?: number } = {};

    if (req.query.userId) {
      conds.userId = Number(req.query.userId);
    }

    const posts = await PostModel.find(conds, null, { sort: 'id' }).exec();

    res.render('posts', {
      posts,
    });
  },
  async getPostById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const postId = Number(req.params.postId);
    const postData = await PostModel.findOne({ id: postId }).exec();

    if (!postData) {
      next({ message: 'No Posts Found' });
      return;
    }

    postData.comments = await CommentModel.find({ postId }, null, { sort: 'id' }).exec();

    res.render('post-detail', {
      postData,
    });
  },
};
