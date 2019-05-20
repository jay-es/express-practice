import CommentModel, { Comment } from '../models/CommentModel';

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
    const errorMessages = [];
    if (!postId) errorMessages.push('postId is required.');
    if (!name) errorMessages.push('name is required.');
    if (!email) errorMessages.push('email is required.');
    if (!body) errorMessages.push('body is required.');

    if (errorMessages.length) {
      throw new Error(errorMessages.join());
    }

    // 手動インクリメント
    const lastComment = await CommentModel.findOne(null, null, { sort: '-id' });
    const id = lastComment ? lastComment.id + 1 : 1;

    await CommentModel.collection.insertOne({ postId, id, name, email, body });
  },
};
