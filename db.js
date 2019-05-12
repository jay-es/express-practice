/* eslint-disable no-console */
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/express-practice';
mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => console.info('MongoDB connection succesful'))
  .catch(err => console.error('MongoDB connection error:', err));
