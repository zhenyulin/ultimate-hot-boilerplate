import mongoose from 'mongoose';

const Author = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Author', Author);
