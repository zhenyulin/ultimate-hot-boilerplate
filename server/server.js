import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware-webpack-2';
import webpackHotMiddleware from 'webpack-hot-middleware';

const PORT = 3000;
const SERVER_START = `server started on port ${PORT}`;
console.time(SERVER_START);
const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpackConfig = require('config/webpack.dev');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(`${__dirname}/../client`));

app.listen(PORT, () => console.timeEnd(SERVER_START));
