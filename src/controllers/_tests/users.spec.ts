import assert from 'assert';
import usersController from '../usersController';
import UserModel from '../../models/usersModel';
import usersTable from './tables/usersTable';
import createArgs from './_util';

describe('usersController', () => {
  before(async () => {
    await UserModel.deleteMany({});
    await UserModel.insertMany(usersTable);
  });

  describe('get: /', () => {
    const { req, res, next } = createArgs();

    before(async () => {
      await usersController.getUsers(req, res, next);
    });

    it('renderは1度だけ呼ばれる', () => {
      assert(res.render.calledOnce);
    });

    it('render引数: viewファイル名', () => {
      const [view] = res.render.args[0];

      assert.strictEqual('users', view);
    });

    it('render引数: users配列', () => {
      const [, options] = res.render.args[0];

      assert(Array.isArray(options.users));
      assert.strictEqual(10, options.users.length);
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

    it('render引数: viewファイル名', () => {
      const [view] = res.render.args[0];

      assert.strictEqual('users-detail', view);
    });

    it('render引数: userData', () => {
      const [, options] = res.render.args[0];

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
