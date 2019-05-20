import mongoose from 'mongoose';

export interface Comment extends mongoose.Document {
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

export default (mongoose.models.Comment as mongoose.Model<Comment>) ||
  mongoose.model<Comment>('Comment', commentSchema);
