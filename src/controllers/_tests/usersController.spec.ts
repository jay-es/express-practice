import assert from 'assert';
import usersController from '../usersController';
import createArgs from './_util';

describe('usersController', () => {
  describe('get: /', () => {
    const { req, res, next } = createArgs();

    before(async () => {
      await usersController.getUsers(req, res, next);
    });

    it('renderは1度だけ呼ばれる', () => {
      assert(res.render.calledOnce);
    });

    it('render引数', () => {
      const [view, options] = res.render.args[0];

      assert.strictEqual(view, 'users');
      assert(Array.isArray(options.users));
    });
  });

  describe('get: /1', () => {
    const { req, res, next } = createArgs();
    req.params.userId = '1';

    before(async () => {
      await usersController.getUserById(req, res, next);
    });

    it('renderは1度だけ呼ばれる', () => {
      assert(res.render.calledOnce);
    });

    it('render引数', () => {
      const [view, options] = res.render.args[0];

      assert.strictEqual(view, 'users-detail');
      assert(options.userData);
    });
  });

  describe('get: /0', () => {
    const { req, res, next } = createArgs();
    req.params.userId = '0';

    before(async () => {
      await usersController.getUserById(req, res, next);
    });

    it('renderは呼ばれず、nextが呼ばれる', () => {
      assert(res.render.notCalled);
      assert(next.calledOnce);
    });
  });
});
