'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var indexPage = '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Minimal Express Webpack-2 React-Hot-Loader-3 Example</title>\n</head>\n<body>\n  <div id="app"></div>\n  <script src="/bundle.js"></script>\n</body>\n</html>\n';


var router = _express2.default.Router();

router.get('/', function (req, res) {
  res.sendFile(indexPage);
});

var _default = router;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(router, 'router', 'server/handler/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'server/handler/index.js');
}();

;