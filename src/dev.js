import webpack from 'webpack'
import WebpackDevServer from "webpack-dev-server";

const OpenBrowserPlugin = require('open-browser-webpack-plugin')

const cfg = require('./webpack.config')
const dev = port => {
  cfg.plugins.push(new OpenBrowserPlugin({ url: `http://localhost:${port}` }));
  new WebpackDevServer(webpack(cfg), {
    contentBase: './public',
    hot: true,
    historyApiFallback: true
  }).listen(port, 'localhost', function(err, res) {
    if (err) console.log(err)
  })
}

module.exports = dev;