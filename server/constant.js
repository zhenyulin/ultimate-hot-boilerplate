import { cleanEnv, num, str, bool } from 'envalid';

const env = cleanEnv(process.env, {
  PORT: num({ default: 3000 }),
  MONGO_DB_URI: str(),
  MONGOOSE_DEBUG: bool({ default: false }),
});

export const { PORT, MONGO_DB_URI, MONGOOSE_DEBUG } = env;

export default env;
