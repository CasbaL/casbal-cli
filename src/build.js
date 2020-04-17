const webpack = require('webpack');
const symbol = require('log-symbols');
const chalk = require('chalk');

const cfg = require('./webpack.build');
const build = () => {
  webpack(cfg, error => {
    if (error !== null) {
      console.log(symbol.error, chalk.red(error));
    } else {
      console.log(symbol.success, chalk.green('打包完成'));
    }
    process.exit(1);
  });
};

module.exports = build;
