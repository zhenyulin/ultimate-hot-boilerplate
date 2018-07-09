const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  target: 'node',
  entry: ['babel-polyfill', path.resolve('./server/index')],
  output: {
    path: path.resolve('./dist'),
    filename: 'server.js',
  },
  resolve: {
    modules: [
      path.resolve('.'), // to resolve path 'server/', 'config/'
      path.resolve('./client'), // to resolve path liek '/components' on client
      'node_modules',
    ],
  },
  externals: nodeExternals(),
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|svg|eot|ttf|otf|wav|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[path][name]_[hash:base64:5].[ext]' },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TARGET: JSON.stringify('server'),
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
