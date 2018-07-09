import mongoose from 'mongoose';
import { MONGO_DB_URI } from 'server/constant';

export default function connectMongoDB() {
  console.time('mongodb connected');
  mongoose.Promise = global.Promise;
  mongoose.connect(
    MONGO_DB_URI,
    { useNewUrlParser: true },
  );

  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
  }

  mongoose.connection.on('connected', () => {
    console.timeEnd('mongodb connected');
  });

  return mongoose.connection;
}
