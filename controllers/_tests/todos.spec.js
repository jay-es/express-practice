const assert = require('assert');
const sinon = require('sinon');
const todosController = require('../todos');
const db = require('../../db');

describe('todosController', () => {
  before(db.open);
  after(db.close);

  describe('get: /', () => {
    const req = {
      query: {},
    };
    const res = {
      render: sinon.spy(),
    };

    before(async () => {
      await todosController.getTodos(req, res);
    });

    it('1度だけ呼ばれる', () => {
      assert(res.render.calledOnce);
    });

    it('renderメソッドに渡される引数', () => {
      const [view, options] = res.render.args[0];

      assert.strictEqual('todos', view);
      assert(Array.isArray(options.todos));
    });
  });
});
