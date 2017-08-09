import { createServer } from 'http';

import app from './server';
import { PORT } from './config/constant';

/* eslint-disable no-console */
const SERVER_START = `server started on port ${PORT}`;
console.time(SERVER_START);
const server = createServer(app);
server.listen(PORT, () => console.timeEnd(SERVER_START));
/* eslint-enable no-console */

if (process.env.NODE_ENV === 'development' && module.hot) {
  let currentApp = app;
  module.hot.accept('./server', () => {
    server.removeListener('request', currentApp);
    const hotApp = require('./server').default;
    server.on('request', hotApp);
    currentApp = hotApp;
  });
}
