import http from 'http';

import app from './server';
import { PORT } from './config/constant';

const server = http.createServer(app);
const SERVER_START = `server started on port ${PORT}`;
console.time(SERVER_START);

let currentApp = app;

server.listen(PORT, () => console.timeEnd(SERVER_START));

if (module.hot) {
  module.hot.accept('./server', () => {
    server.removeListener('request', currentApp);
    const hotApp = require('./server').default;
    server.on('request', hotApp);
    currentApp = hotApp;
  });
}
