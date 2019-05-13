const assert = require('assert');
const sinon = require('sinon');
const usersController = require('../users');
const db = require('../../db');

describe('usersController', () => {
  before(db.open);
  after(db.close);

  describe('get: /', () => {
    const res = {
      render: sinon.spy(),
    };

    before(async () => {
      await usersController.getUsers(null, res);
    });

    it('1度だけ呼ばれる', () => {
      assert(res.render.calledOnce);
    });

    it('renderメソッドに渡される引数', () => {
      const [view, options] = res.render.args[0];

      assert.strictEqual('users', view);
      assert(Array.isArray(options.users));
    });
  });
});
