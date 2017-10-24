import mongoose from 'mongoose';

const { Schema } = mongoose;

const Comment = new Schema({
  content: String,
  author: String,
});

export default mongoose.model('Comment', Comment);
