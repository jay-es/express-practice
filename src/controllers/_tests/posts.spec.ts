import assert from 'assert';
import postsController from '../postsController';
import PostModel from '../../models/postsModel';
import postsTable from './tables/postsTable';
import createArgs from './_util';

describe('postsController', () => {
  before(async () => {
    await PostModel.deleteMany({});
    await PostModel.insertMany(postsTable);
  });

  describe('get: /', () => {
    const { req, res, next } = createArgs();

    before(async () => {
      await postsController.getPosts(req, res, next);
    });

    it('renderは1度だけ呼ばれる', () => {
      assert(res.render.calledOnce);
    });

    it('render引数: viewファイル名', () => {
      const [view] = res.render.args[0];

      assert.strictEqual('posts', view);
    });

    it('render引数: posts配列', () => {
      const [, options] = res.render.args[0];

      assert(Array.isArray(options.posts));
      assert.strictEqual(100, options.posts.length);
    });
  });

  describe('get: /?usetId=1', () => {
    const { req, res, next } = createArgs();
    req.query.userId = '1';

    before(async () => {
      await postsController.getPosts(req, res, next);
    });

    it('render引数: posts配列', () => {
      const [, options] = res.render.args[0];

      assert.strictEqual(10, options.posts.length);
    });
  });

  describe('get: /1', () => {
    const { req, res, next } = createArgs();
    req.params.postId = '1';

    before(async () => {
      await postsController.getPostById(req, res, next);
    });

    it('renderは1度だけ呼ばれる', () => {
      assert(res.render.calledOnce);
    });

    it('render引数: viewファイル名', () => {
      const [view] = res.render.args[0];

      assert.strictEqual('post-detail', view);
    });

    it('render引数: postData', () => {
      const [, options] = res.render.args[0];

      assert(options.postData);
      assert(Array.isArray(options.postData.comments));
    });
  });

  describe('get: /0', () => {
    const { req, res, next } = createArgs();
    req.params.postId = '0';

    before(async () => {
      await postsController.getPostById(req, res, next);
    });

    it('renderは呼ばれず、nextが呼ばれる', () => {
      assert(res.render.notCalled);
      assert(next.calledOnce);
    });
  });
});
