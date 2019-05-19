import assert from 'assert';
import userService from '../userService';
import UserModel from '../../models/UserModel';
import usersTable from './tables/usersTable';

describe('getUsers', () => {
  before(async () => {
    await UserModel.deleteMany({});
    await UserModel.insertMany(usersTable);
  });

  describe('getUsers', () => {
    it('すべてのユーザーを取得', async () => {
      const users = await userService.getUsers();

      assert.strictEqual(users.length, 10);
    });
  });

  describe('getUserById', () => {
    it('存在するuserIdを指定', async () => {
      const userData = await userService.getUserById(1);

      assert(userData);
    });

    it('存在しないuserIdを指定', () => {
      assert.rejects(userService.getUserById(0));
    });
  });
});
