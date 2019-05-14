import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  username: String,
  email: String,
});

export default mongoose.models.user || mongoose.model('user', userSchema);
