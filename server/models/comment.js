import mongoose from 'mongoose';

const { Schema } = mongoose;

const Comment = new Schema({
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
  },
});

export default mongoose.model('Comment', Comment);
