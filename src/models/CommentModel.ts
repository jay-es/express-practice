import mongoose from 'mongoose';

export interface Comment extends mongoose.Document {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const commentSchema = new mongoose.Schema({
  postId: Number,
  id: Number,
  name: String,
  email: String,
  body: String,
});

export default (mongoose.models.Comment as mongoose.Model<Comment>) ||
  mongoose.model<Comment>('Comment', commentSchema);
