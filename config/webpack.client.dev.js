const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  target: 'web',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?timeout=2000',
    path.resolve('./client/index.js'),
  ],
  output: {
    path: path.resolve('./client/'),
    filename: 'client.js',
    publicPath: '/',
  },
  resolve: {
    modules: [
      path.resolve('./client'), // to resolve path like '/components' on client
      path.resolve('node_modules'),
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.tsx?$/,
        use: ['awesome-typescript-loader'],
        exclude: /node_modules/,
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
            options: {
              name: '[path][name]_[hash:base64:5].[ext]',
            },
          },
        ],
      },
    ],
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
  ],
  stats: {
    colors: true,
    modules: false,
    version: false,
    hash: false,
    timings: false,
  },
};
