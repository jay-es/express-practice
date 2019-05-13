const assert = require('assert');
const sinon = require('sinon');
const usersController = require('../users');
const UserModel = require('../../models/usersModel');
const { usersTable } = require('./tables/usersTable');
const db = require('../../db');

describe('usersController', () => {
  before(async () => {
    await db.open();
    await UserModel.deleteMany();
    await UserModel.insertMany(usersTable);
  });
  after(db.close);

  describe('get: /', () => {
    const res = {
      render: sinon.spy(),
    };

    before(async () => {
      await usersController.getUsers(null, res);
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
    const req = {
      params: {
        userId: '1',
      },
    };
    const res = {
      render: sinon.spy(),
    };

    before(async () => {
      await usersController.getUserById(req, res);
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
    const req = {
      params: {
        userId: '0',
      },
    };
    const res = {
      render: sinon.spy(),
    };
    const next = sinon.spy();

    before(async () => {
      await usersController.getUserById(req, res, next);
    });

    it('renderは呼ばれず、nextが呼ばれる', () => {
      assert(res.render.notCalled);
      assert(next.calledOnce);
    });
  });
});
