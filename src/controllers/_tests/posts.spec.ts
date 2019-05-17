import assert from 'assert';
import postsController from '../postsController';
import PostModel from '../../models/postsModel';
import postsTable from './tables/postsTable';
import CommentModel from '../../models/commentsModel';
import commentsTable from './tables/commentsTable';
import createArgs from './_util';

describe('postsController', () => {
  before(async () => {
    await PostModel.deleteMany({});
    await PostModel.insertMany(postsTable);
  });
  before(async () => {
    await CommentModel.deleteMany({});
    await CommentModel.insertMany(commentsTable);
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

      assert.strictEqual(view, 'posts');
    });

    it('render引数: posts配列', () => {
      const [, options] = res.render.args[0];

      assert(Array.isArray(options.posts));
      assert.strictEqual(options.posts.length, 100);
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

      assert.strictEqual(options.posts.length, 10);
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

      assert.strictEqual(view, 'post-detail');
    });

    it('render引数: postData', () => {
      const [, options] = res.render.args[0];

      assert(options.postData);
      assert(Array.isArray(options.postData.comments));
      assert.strictEqual(options.postData.comments.length, 5);
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

  describe('post: /1/comment', () => {
    const { req, res, next } = createArgs();
    req.params.postId = '1';
    req.body = {
      postId: 1,
      name: 'nnn',
      email: 'eee',
      body: 'bbb',
    };

    it('postにひもづくコメントが1件増えている', async () => {
      await postsController.postCommentByPostId(req, res, next);
      const comments = await CommentModel.find({ postId: 1 }, null, { sort: 'id' }).exec();
      assert.strictEqual(comments.length, 6);
    });

    it('nameがないと、nextが呼ばれる', async () => {
      req.body.name = '';
      await postsController.postCommentByPostId(req, res, next);
      assert(next.calledOnce);
    });
  });
});
