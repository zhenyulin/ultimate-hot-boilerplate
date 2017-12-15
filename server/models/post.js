import mongoose from 'mongoose';

const { Schema } = mongoose;
const { Types } = Schema;
const { ObjectId } = Types;

const Post = new Schema(
  {
    title: String,
    body: String,
    comments: [
      {
        type: ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    usePushEach: true,
  },
);

export default mongoose.model('Post', Post);
