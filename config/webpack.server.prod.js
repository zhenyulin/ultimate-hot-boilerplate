/*
  WIP
 */
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server/index',
  output: {
    path: path.resolve('./dist/server'),
    filename: 'server.js',
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /\.js?$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TARGET: JSON.stringify('server'),
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
  ],
};
