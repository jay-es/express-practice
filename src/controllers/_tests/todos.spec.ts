import assert from 'assert';
import todosController from '../todosController';
import TodoModel from '../../models/todosModel';
import todosTable from './tables/todosTable';
import createArgs from './_util';

describe('todosController', () => {
  before(async () => {
    await TodoModel.deleteMany({});
    await TodoModel.insertMany(todosTable);
  });

  describe('get: /', () => {
    const { req, res, next } = createArgs();

    before(async () => {
      await todosController.getTodos(req, res, next);
    });

    it('renderは1度だけ呼ばれる', () => {
      assert(res.render.calledOnce);
    });

    it('render引数: viewファイル名', () => {
      const [view] = res.render.args[0];

      assert.strictEqual(view, 'todos');
    });

    it('render引数: todos配列', () => {
      const [, options] = res.render.args[0];

      assert(Array.isArray(options.todos));
      assert.strictEqual(options.todos.length, 200);
    });
  });

  describe('get: /?usetId=1', () => {
    const { req, res, next } = createArgs();
    req.query.userId = '1';

    before(async () => {
      await todosController.getTodos(req, res, next);
    });

    it('render引数: todos配列', () => {
      const [, options] = res.render.args[0];

      assert.strictEqual(options.todos.length, 20);
    });
  });

  describe('get: /?completed=1', () => {
    const { req, res, next } = createArgs();
    req.query.completed = '1';

    before(async () => {
      await todosController.getTodos(req, res, next);
    });

    it('render引数: todos配列', () => {
      const [, options] = res.render.args[0];

      assert.strictEqual(options.todos.length, 90);
    });
  });

  describe('get: /1', () => {
    const { req, res, next } = createArgs();
    req.params.todoId = '1';

    before(async () => {
      await todosController.getTodoById(req, res, next);
    });

    it('renderは1度だけ呼ばれる', () => {
      assert(res.render.calledOnce);
    });

    it('render引数: viewファイル名', () => {
      const [view] = res.render.args[0];

      assert.strictEqual(view, 'todos');
    });

    it('render引数: todos配列', () => {
      const [, options] = res.render.args[0];

      assert(Array.isArray(options.todos));
      assert.strictEqual(options.todos.length, 1);
    });
  });

  describe('get: /0', () => {
    const { req, res, next } = createArgs();
    req.params.todoId = '0';

    before(async () => {
      await todosController.getTodoById(req, res, next);
    });

    it('renderは呼ばれず、nextが呼ばれる', () => {
      assert(res.render.notCalled);
      assert(next.calledOnce);
    });
  });
});
