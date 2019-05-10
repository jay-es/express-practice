const assert = require('assert');
const todosModel = require('../todosModel');

describe('todosModel', () => {
  describe('getAll', () => {
    const res = todosModel.getAll();

    it('全件数が取得できる', () => {
      assert.strictEqual(200, res.length);
    });

    it('ToDoの配列が取得できる', () => {
      assert.strictEqual('delectus aut autem', res[0].title);
    });
  });

  describe('findById', () => {
    const res1 = todosModel.findById(1);
    const res2 = todosModel.findById(2);

    it('IDで指定したToDoが1件取得できる', () => {
      assert.strictEqual('delectus aut autem', res1.title);
      assert.strictEqual('quis ut nam facilis et officia qui', res2.title);
    });
  });

  describe('getByUserId', () => {
    const res1 = todosModel.getByUserId(1);
    const res2 = todosModel.getByUserId(2);

    it('ユーザーIDで指定したToDoが全件取得できる', () => {
      assert.strictEqual(20, res1.length);
      assert.strictEqual(20, res2.length);
    });

    it('中身はToDoの配列になっている', () => {
      assert.strictEqual('delectus aut autem', res1[0].title);
      assert.strictEqual('suscipit repellat esse quibusdam voluptatem incidunt', res2[0].title);
    });
  });
});
