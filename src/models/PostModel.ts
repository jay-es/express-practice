import mongoose from 'mongoose';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const postSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  body: String,
});

export default mongoose.models.Post || mongoose.model('Post', postSchema);
