/* eslint-disable no-console */
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/express-practice';

exports.open = () => mongoose.connect(uri, { useNewUrlParser: true })
  // .then(() => console.info('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection error:', err));

exports.close = () => mongoose.disconnect();
