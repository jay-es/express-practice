import assert from 'assert';
import postModel, { Model } from '../postModel';
import postsTable from './tables/postsTable';

describe('postModel', () => {
  before(async () => {
    await Model.deleteMany({});
    await Model.insertMany(postsTable);
  });

  describe('getTodos', () => {
    it('条件なしなら全件取得', async () => {
      const posts = await postModel.getPosts();

      assert.strictEqual(posts.length, 100);
    });

    it('userId指定', async () => {
      const posts = await postModel.getPosts({ userId: 1 });

      assert.strictEqual(posts.length, 10);
    });
  });

  describe('getPostById', () => {
    it('存在するpostIdを指定', async () => {
      const postData = await postModel.getPostById(1);

      assert(postData);
    });

    it('存在しないpostIdを指定', async () => {
      assert.rejects(postModel.getPostById(0));
    });
  });
});
