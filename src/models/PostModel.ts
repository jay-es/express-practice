import mongoose from 'mongoose';

export interface Post extends mongoose.Document {
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

export default (mongoose.models.Post as mongoose.Model<Post>) ||
  mongoose.model<Post>('Post', postSchema);
