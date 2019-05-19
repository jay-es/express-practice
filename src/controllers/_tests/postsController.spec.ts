import assert from 'assert';
import postsController from '../postsController';
import createArgs from './_util';

describe('postsController', () => {
  describe('get: /', () => {
    const { req, res, next } = createArgs();

    before(async () => {
      await postsController.getPosts(req, res, next);
    });

    it('renderは1度だけ呼ばれる', () => {
      assert(res.render.calledOnce);
    });

    it('render引数', () => {
      const [view, options] = res.render.args[0];

      assert.strictEqual(view, 'posts');
      assert(Array.isArray(options.posts));
    });
  });

  describe('get: /?usetId=1', () => {
    const { req, res, next } = createArgs();
    req.query.userId = '1';

    before(async () => {
      await postsController.getPosts(req, res, next);
    });

    it('render引数', () => {
      const [view, options] = res.render.args[0];

      assert.strictEqual(view, 'posts');
      assert(Array.isArray(options.posts));
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

    it('render引数', () => {
      const [view, options] = res.render.args[0];

      assert.strictEqual(view, 'post-detail');
      assert(options.postData);
      assert(Array.isArray(options.comments));
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

    it('コメントが投稿されたらリダイレクトされる', async () => {
      await postsController.postCommentByPostId(req, res, next);

      assert(res.redirect.calledOnce);
    });

    it('nameがないと、nextが呼ばれる', async () => {
      req.body.name = '';
      await postsController.postCommentByPostId(req, res, next);

      assert(next.calledOnce);
    });
  });
});
