import mongoose from 'mongoose';
import { MONGO_DB_URI, MONGOOSE_DEBUG } from 'server/constant';

const DB_OPTIONS = {
  useMongoClient: true,
};

export default function connectMongoDB() {
  console.time('mongodb connected');
  mongoose.Promise = global.Promise;
  mongoose.connect(MONGO_DB_URI, DB_OPTIONS);

  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', MONGOOSE_DEBUG);
  }

  mongoose.connection.on('connected', () => {
    console.timeEnd('mongodb connected');
  });

  return mongoose.connection;
}
