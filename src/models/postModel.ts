import mongoose from 'mongoose';

interface Post extends mongoose.Document {
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

export const Model: mongoose.Model<Post> =
  mongoose.models.Post || mongoose.model('Post', postSchema);

export default {
  async getPosts(conds?: { userId?: number }): Promise<Post[]> {
    const posts = await Model.find(conds, null, { sort: 'id' }).exec();
    return posts;
  },
  async getPostById(postId: number): Promise<Post> {
    const result = await Model.findOne({ id: postId }).exec();
    return result ? result.toObject() : new Model();
  },
};
