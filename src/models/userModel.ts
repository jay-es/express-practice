import mongoose from 'mongoose';

interface User extends mongoose.Document {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  username: String,
  email: String,
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: {
      lat: String,
      lng: String,
    },
  },
  phone: String,
  website: String,
  company: {
    name: String,
    catchPhrase: String,
    bs: String,
  },
});

export const Model: mongoose.Model<User> =
  mongoose.models.User || mongoose.model('User', userSchema);

export default {
  async getUsers(): Promise<User[]> {
    const users = await Model.find(null, null, { sort: 'id' }).exec();
    return users;
  },
  async getUserById(userId: number): Promise<User> {
    const result = await Model.findOne({ id: userId }).exec();

    if (!result) {
      throw new Error('No Users Found');
    }

    return result.toObject();
  },
};
