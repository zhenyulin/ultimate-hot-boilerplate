import mongoose from 'mongoose';

const { Schema } = mongoose;
const { Types } = Schema;
const { ObjectId } = Types;

const Comment = new Schema({
  content: String,
  author: {
    type: ObjectId,
    ref: 'Author',
  },
  post: {
    type: ObjectId,
    ref: 'Post',
  },
});

export default mongoose.model('Comment', Comment);
