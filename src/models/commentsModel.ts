import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  postId: Number,
  id: Number,
  name: String,
  email: String,
  body: String,
});

export default mongoose.models.Comment || mongoose.model('Comment', commentSchema);
