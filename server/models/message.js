import mongoose from 'mongoose';

const Message = new mongoose.Schema({
  id: Number,
  title: String,
  body: String,
});

export default mongoose.model('Message', Message);
