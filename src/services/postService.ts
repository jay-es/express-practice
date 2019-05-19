import PostModel, { Post } from '../models/PostModel';

export default {
  async getPosts(conds?: { userId?: number }): Promise<Post[]> {
    const posts = await PostModel.find(conds, null, { sort: 'id' }).exec();

    return posts;
  },
  async getPostById(postId: number): Promise<Post> {
    const result = await PostModel.findOne({ id: postId }).exec();

    if (!result) {
      throw new Error('No Posts Found');
    }

    return result._doc;
  },
};
