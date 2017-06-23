import path from 'path';

import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve('./client/index.js'),
  ],
  output: {
    path: path.resolve('./client/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    modules: [
      path.resolve('./client'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
    alias: {
      request: 'browser-request',
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './client/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|svg|eot|ttf|otf|wav|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]_[hash:base64:5].[ext]',
            },
          },
        ],
      },
    ],
  },
};
