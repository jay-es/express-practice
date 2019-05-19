import assert from 'assert';
import todosController from '../todosController';
import createArgs from './_util';

describe('todosController', () => {
  describe('get: /', () => {
    const { req, res, next } = createArgs();

    before(async () => {
      await todosController.getTodos(req, res, next);
    });

    it('renderは1度だけ呼ばれる', () => {
      assert(res.render.calledOnce);
    });

    it('render引数', () => {
      const [view, options] = res.render.args[0];

      assert.strictEqual(view, 'todos');
      assert(Array.isArray(options.todos));
    });
  });

  describe('get: /?usetId=1', () => {
    const { req, res, next } = createArgs();
    req.query.userId = '1';

    before(async () => {
      await todosController.getTodos(req, res, next);
    });

    it('render引数', () => {
      const [view, options] = res.render.args[0];

      assert.strictEqual(view, 'todos');
      assert(Array.isArray(options.todos));
    });
  });

  describe('get: /?completed=1', () => {
    const { req, res, next } = createArgs();
    req.query.completed = '1';

    before(async () => {
      await todosController.getTodos(req, res, next);
    });

    it('render引数', () => {
      const [view, options] = res.render.args[0];

      assert.strictEqual(view, 'todos');
      assert(Array.isArray(options.todos));
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

    it('render引数', () => {
      const [view, options] = res.render.args[0];

      assert.strictEqual(view, 'todos');
      assert(Array.isArray(options.todos));
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
