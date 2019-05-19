import assert from 'assert';
import todoService from '../todoService';
import TodoModel from '../../models/TodoModel';
import todosTable from './tables/todosTable';

describe('todoService', () => {
  before(async () => {
    await TodoModel.deleteMany({});
    await TodoModel.insertMany(todosTable);
  });

  describe('getTodos', () => {
    it('条件なしなら全件取得', async () => {
      const todos = await todoService.getTodos();

      assert.strictEqual(todos.length, 200);
    });

    it('userId指定', async () => {
      const todos = await todoService.getTodos({ userId: 1 });

      assert.strictEqual(todos.length, 20);
    });

    it('completed指定', async () => {
      const todos = await todoService.getTodos({ completed: true });

      assert.strictEqual(todos.length, 90);
    });

    it('userIdとcompleted指定', async () => {
      const todos = await todoService.getTodos({ userId: 1, completed: true });

      assert.strictEqual(todos.length, 11);
    });
  });

  describe('getTodoById', () => {
    it('存在するtodoIdを指定', async () => {
      const todo = await todoService.getTodoById(1);

      assert(todo);
    });

    it('存在しないtodoIdを指定', () => {
      assert.rejects(todoService.getTodoById(0));
    });
  });
});
