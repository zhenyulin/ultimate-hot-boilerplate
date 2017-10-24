import mongoose from 'mongoose';

const { Schema } = mongoose;

const Post = new Schema({
  title: String,
  body: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

export default mongoose.model('Post', Post);
