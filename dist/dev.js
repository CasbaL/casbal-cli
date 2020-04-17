"use strict";

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var cfg = require('./webpack.config');

var dev = function dev(port) {
  cfg.plugins.push(new OpenBrowserPlugin({
    url: "http://localhost:".concat(port)
  }));
  new _webpackDevServer["default"]((0, _webpack["default"])(cfg), {
    contentBase: './public',
    hot: true,
    historyApiFallback: true
  }).listen(port, 'localhost', function (err, res) {
    if (err) console.log(err);
  });
};

module.exports = dev;