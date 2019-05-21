import assert from 'assert';
import todoModel, { Model } from '../todoModel';
import todosTable from './tables/todosTable';

describe('todoModel', () => {
  before(async () => {
    await Model.deleteMany({});
    await Model.insertMany(todosTable);
  });

  describe('getTodos', () => {
    it('条件なしなら全件取得', async () => {
      const todos = await todoModel.getTodos();

      assert.strictEqual(todos.length, 200);
    });

    it('userId指定', async () => {
      const todos = await todoModel.getTodos({ userId: 1 });

      assert.strictEqual(todos.length, 20);
    });

    it('completed指定', async () => {
      const todos = await todoModel.getTodos({ completed: true });

      assert.strictEqual(todos.length, 90);
    });

    it('userIdとcompleted指定', async () => {
      const todos = await todoModel.getTodos({ userId: 1, completed: true });

      assert.strictEqual(todos.length, 11);
    });
  });

  describe('getTodoById', () => {
    it('存在するtodoIdを指定', async () => {
      const todo = await todoModel.getTodoById(1);

      assert(todo);
    });

    it('存在しないtodoIdを指定', () => {
      assert.rejects(todoModel.getTodoById(0));
    });
  });
});
