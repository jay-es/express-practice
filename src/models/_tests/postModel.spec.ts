import assert from 'assert';
import postService from '../postService';
import PostModel from '../../models/PostModel';
import postsTable from './tables/postsTable';

describe('todoService', () => {
  before(async () => {
    await PostModel.deleteMany({});
    await PostModel.insertMany(postsTable);
  });

  describe('getTodos', () => {
    it('条件なしなら全件取得', async () => {
      const posts = await postService.getPosts();

      assert.strictEqual(posts.length, 100);
    });

    it('userId指定', async () => {
      const posts = await postService.getPosts({ userId: 1 });

      assert.strictEqual(posts.length, 10);
    });
  });

  describe('getPostById', () => {
    it('存在するpostIdを指定', async () => {
      const postData = await postService.getPostById(1);

      assert(postData);
    });

    it('存在しないpostIdを指定', async () => {
      assert.rejects(postService.getPostById(0));
    });
  });
});
