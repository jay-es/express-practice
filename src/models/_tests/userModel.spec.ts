import assert from 'assert';
import userModel, { Model } from '../userModel';
import usersTable from './tables/usersTable';

describe('userModel', () => {
  before(async () => {
    await Model.deleteMany({});
    await Model.insertMany(usersTable);
  });

  describe('getUsers', () => {
    it('すべてのユーザーを取得', async () => {
      const users = await userModel.getUsers();

      assert.strictEqual(users.length, 10);
    });
  });

  describe('getUserById', () => {
    it('存在するuserIdを指定', async () => {
      const userId = 1;
      const userData = await userModel.getUserById(userId);

      assert.strictEqual(userData.id, userId);
    });

    it('存在しないuserIdを指定', async () => {
      const userId = 0;
      const userData = await userModel.getUserById(userId);

      assert.strictEqual(userData.id, undefined);
    });
  });
});
