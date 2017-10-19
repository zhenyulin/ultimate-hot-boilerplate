import mongoose from 'mongoose';

const Post = new mongoose.Schema({
  title: String,
  body: String,
});

export default mongoose.model('Post', Post);
