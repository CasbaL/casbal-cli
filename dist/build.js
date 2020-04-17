"use strict";

var webpack = require('webpack');

var symbol = require('log-symbols');

var chalk = require('chalk');

var cfg = require('./webpack.build');

var build = function build() {
  webpack(cfg, function (error) {
    if (error !== null) {
      console.log(symbol.error, chalk.red(error));
    } else {
      console.log(symbol.success, chalk.green('打包完成'));
    }

    process.exit(1);
  });
};

module.exports = build;