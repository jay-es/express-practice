const assert = require('assert');
const sinon = require('sinon');
const todosController = require('../todos');
const TodoModel = require('../../models/todosModel');
const { todosTable } = require('./tables/todosTable');
const db = require('../../db');

describe('todosController', () => {
  before(async () => {
    await db.open();
    await TodoModel.deleteMany();
    await TodoModel.insertMany(todosTable);
  });
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

    it('renderは1度だけ呼ばれる', () => {
      assert(res.render.calledOnce);
    });

    it('render引数: viewファイル名', () => {
      const [view] = res.render.args[0];

      assert.strictEqual('todos', view);
    });

    it('render引数: todos配列', () => {
      const [, options] = res.render.args[0];

      assert(Array.isArray(options.todos));
      assert.strictEqual(200, options.todos.length);
    });
  });

  describe('get: /?usetId=1', () => {
    const req = {
      query: {
        userId: '1',
      },
    };
    const res = {
      render: sinon.spy(),
    };

    before(async () => {
      await todosController.getTodos(req, res);
    });

    it('render引数: todos配列', () => {
      const [, options] = res.render.args[0];

      assert.strictEqual(20, options.todos.length);
    });
  });

  describe('get: /?completed=1', () => {
    const req = {
      query: {
        completed: '1',
      },
    };
    const res = {
      render: sinon.spy(),
    };

    before(async () => {
      await todosController.getTodos(req, res);
    });

    it('render引数: todos配列', () => {
      const [, options] = res.render.args[0];

      assert.strictEqual(90, options.todos.length);
    });
  });

  describe('get: /1', () => {
    const req = {
      params: {
        todoId: '1',
      },
    };
    const res = {
      render: sinon.spy(),
    };

    before(async () => {
      await todosController.getTodoById(req, res);
    });

    it('renderは1度だけ呼ばれる', () => {
      assert(res.render.calledOnce);
    });

    it('render引数: viewファイル名', () => {
      const [view] = res.render.args[0];

      assert.strictEqual('todos', view);
    });

    it('render引数: todos配列', () => {
      const [, options] = res.render.args[0];

      assert(Array.isArray(options.todos));
      assert.strictEqual(1, options.todos.length);
    });
  });

  describe('get: /0', () => {
    const req = {
      params: {
        todoId: '0',
      },
    };
    const res = {
      render: sinon.spy(),
    };
    const next = sinon.spy();

    before(async () => {
      await todosController.getTodoById(req, res, next);
    });

    it('renderは呼ばれず、nextが呼ばれる', () => {
      assert(res.render.notCalled);
      assert(next.calledOnce);
    });
  });
});
