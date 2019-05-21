import mongoose from 'mongoose';
import postModel from './postModel';

interface Comment extends mongoose.Document {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const commentSchema = new mongoose.Schema({
  postId: { type: Number, required: true },
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  body: { type: String, required: true },
});

export const Model: mongoose.Model<Comment> =
  mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default {
  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    const comments = await Model.find({ postId }, null, { sort: 'id' }).exec();
    return comments;
  },
  async postComment(postId: number, name: string, email: string, body: string): Promise<void> {
    // post が存在するか確認（なければ例外発生）
    await postModel.getPostById(postId);

    // 手動インクリメント
    const lastComment = await Model.findOne(null, null, { sort: '-id' }).exec();
    const id = lastComment ? lastComment.id + 1 : 1;

    const newComment = new Model({ postId, id, name, email, body });
    await newComment.validate();
    await newComment.save();
  },
};
