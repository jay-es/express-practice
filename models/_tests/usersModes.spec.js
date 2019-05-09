const assert = require('assert');
const usersModel = require('../usersModel');

describe('usersModel', () => {
  describe('getSummery', () => {
    const res = usersModel.getSummery();

    it('全件数が取得できる', () => {
      assert.strictEqual(10, res.length);
    });

    it('ユーザーの配列が取得できる', () => {
      assert.strictEqual('Leanne Graham', res[0].name);
    });
  });

  describe('findById', () => {
    const res1 = usersModel.findById(1);
    const res2 = usersModel.findById(2);

    it('IDで指定したユーザーが1件取得できる', () => {
      assert.strictEqual('Leanne Graham', res1.name);
      assert.strictEqual('Ervin Howell', res2.name);
    });
  });
});
