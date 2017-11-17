import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import router from './router';
import connectMongoDB from './config/mongodb';

const app = express();
// TODO: connectMongoDB in server.js only during test
// move the function to index.js
connectMongoDB();

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware-webpack-2');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('config/webpack.client.dev');
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    }),
  );
  app.use(webpackHotMiddleware(compiler));
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

/* istanbul ignore next */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('./dist/')));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

export default app;
