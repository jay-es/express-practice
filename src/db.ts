/* eslint-disable no-console */
import mongoose from 'mongoose';

const uri =
  process.env.NODE_ENV === 'test'
    ? 'mongodb://localhost:27017/express-practice-test'
    : 'mongodb://localhost:27017/express-practice';

export default {
  open: () =>
    mongoose
      .connect(uri, { useNewUrlParser: true })
      // .then(() => console.info('MongoDB connection successful'))
      .catch(err => console.error('MongoDB connection error:', err)),
  close: () => mongoose.disconnect(),
};
