import { cleanEnv, num, str } from 'envalid';

const env = cleanEnv(process.env, {
  PORT: num({ default: 3000 }),
  MONGO_DB_URI: str(),
});

export const { PORT, MONGO_DB_URI } = env;

export default env;
