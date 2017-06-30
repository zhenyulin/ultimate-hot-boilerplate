const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  target: 'web',
  entry: path.resolve('./client/index.js'),
  output: {
    path: path.resolve('./dist/'),
    filename: 'client.js',
    publicPath: '/',
  },
  resolve: {
    modules: [
      path.resolve('./client'), // to resolve path liek '/components' on client
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
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
    new webpack.DefinePlugin({
      'process.env': {
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
