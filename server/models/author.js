import mongoose from 'mongoose';
import findOneOrCreate from 'mongoose-findoneorcreate';

const { Schema } = mongoose;

const Author = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

Author.plugin(findOneOrCreate);

export default mongoose.model('Author', Author);
