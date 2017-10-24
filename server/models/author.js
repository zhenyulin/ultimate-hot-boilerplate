import mongoose from 'mongoose';
import findOneOrCreate from 'mongoose-findoneorcreate';

const Author = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
});

Author.plugin(findOneOrCreate);

export default mongoose.model('Author', Author);
