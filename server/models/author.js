import mongoose from 'mongoose';
import findOneOrCreate from 'mongoose-findoneorcreate';

const { Schema } = mongoose;
const { Types } = Schema;
const { ObjectId } = Types;

const Author = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    commented: [
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

Author.plugin(findOneOrCreate);

export default mongoose.model('Author', Author);
