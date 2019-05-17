import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  body: String,
});

export default mongoose.models.Post || mongoose.model('Post', postSchema);
