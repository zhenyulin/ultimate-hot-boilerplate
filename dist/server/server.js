'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = 3000;
var SERVER_START = 'server started on port ' + PORT;
console.time(SERVER_START);
var app = (0, _express2.default)();

if (process.env.NODE_ENV !== 'production') {
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware-webpack-2');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpackConfig = require('config/webpack.dev');
  var compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(_express2.default.static(__dirname + '/../client'));

app.listen(PORT, function () {
  return console.timeEnd(SERVER_START);
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(PORT, 'PORT', 'server/server.js');

  __REACT_HOT_LOADER__.register(SERVER_START, 'SERVER_START', 'server/server.js');

  __REACT_HOT_LOADER__.register(app, 'app', 'server/server.js');
}();

;