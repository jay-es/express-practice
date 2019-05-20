import CommentModel, { Comment } from '../models/CommentModel';
import postService from './postService';

export default {
  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    const comments = await CommentModel.find({ postId }, null, { sort: 'id' }).exec();
    return comments;
  },
  async postCommentByPostId(
    postId: number,
    name: string,
    email: string,
    body: string,
  ): Promise<void> {
    // post が存在するか確認（なければ例外発生）
    await postService.getPostById(postId);

    // 手動インクリメント
    const lastComment = await CommentModel.findOne(null, null, { sort: '-id' });
    const id = lastComment ? lastComment.id + 1 : 1;

    const newComment = new CommentModel({ postId, id, name, email, body });
    await newComment.validate();
    await newComment.save();
  },
};
