import UserModel, { User } from '../models/UserModel';

export default {
  async getUsers(): Promise<User[]> {
    const users = await UserModel.find(null, null, { sort: 'id' }).exec();
    return users;
  },
  async getUserById(userId: number): Promise<User> {
    const result = await UserModel.findOne({ id: userId }).exec();

    if (!result) {
      throw new Error('No Users Found');
    }

    return result._doc;
  },
};
