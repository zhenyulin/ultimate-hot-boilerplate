import mongoose from 'mongoose';
import { MONGO_DB_URI, MONGOOSE_DEBUG } from 'server/constant';

export default function connectMongoDB() {
  const DB_CONNECT = 'mongodb connected';
  console.time(DB_CONNECT);
  mongoose.Promise = global.Promise;
  mongoose.connect(
    MONGO_DB_URI,
    { useNewUrlParser: true },
  );

  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', MONGOOSE_DEBUG);
  }

  mongoose.connection.on('connected', () => {
    console.timeEnd(DB_CONNECT);
  });

  return mongoose.connection;
}
