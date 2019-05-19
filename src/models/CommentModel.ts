import mongoose from 'mongoose';

export interface Comment {
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

export default mongoose.models.Comment || mongoose.model('Comment', commentSchema);
