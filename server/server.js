import express from 'express';
import setupDevMiddleware from './config/dev-middleware';

const PORT = 3000;
const SERVER_START = `server started on port ${PORT}`;
console.time(SERVER_START);
const app = express();

if (process.env.NODE_ENV !== 'production') {
  setupDevMiddleware(app);
}

app.use(express.static(`${__dirname}/../client`));

app.listen(PORT, () => console.timeEnd(SERVER_START));
