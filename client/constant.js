/*
  All constants registered here would be passed to window.CONFIG object via server
 */
import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
  VERSION: str(),
});

export const { VERSION } = env;

export default env;
