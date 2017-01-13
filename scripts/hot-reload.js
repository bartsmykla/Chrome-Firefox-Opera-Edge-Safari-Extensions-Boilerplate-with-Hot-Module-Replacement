const WebpackDevServer = require('webpack-dev-server');
const HtmlPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const webpack = require('webpack');
const config = require('../webpack.config');
const helpers = require('../config/helpers');
const defaults = require('../config/defaults');


const options = {};
const excludeEntriesToHotReload = (options.notHotReload || [ 'injector' ]);

const { root } = helpers;
const PORT = defaults.HMR_PORT || 3000;

console.log('Starting WebpackDevServer debug');

config.devtool = 'eval',

config.plugins =
[
  new HtmlPlugin({
    template: root('scripts/hot-reload.html'), inject: true, minify: { removeComments: false, collapseWhitespace: false, keepClosingSlash:false }
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.NamedModulesPlugin(),
  new WriteFilePlugin(),
  new webpack.LoaderOptionsPlugin({
    debug: true, minimize: false
  }),
].concat(config.plugins || []);

Object.keys(config.entry).forEach(entryName => {
  if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
    config.entry[entryName] =
    [
      'react-hot-loader/patch',
      'webpack-dev-server/client?https://localhost:' + PORT,
      'webpack/hot/only-dev-server',
      'react-hot-loader',
    ].concat(config.entry[entryName]);
  }
});

config.cache = true;

try {

  const compiler = webpack(config);

  const server = new WebpackDevServer(compiler,{
    https: true,
    contentBase: root('dist'),
    historyApiFallback: true,
    noInfo: true,
    hot: true,
    inline: true,
    stats: { colors: true, assets: false },
    headers: { "Access-Control-Allow-Origin": "*" },
    clientLogLevel: "info",
    proxy: {
      '*': {
        target: 'https://localhost:3000',
        secure: true,
      },
    }
  });

  server.listen(3000,'localhost', () => {
    console.log('Listening on port 3000');
  });

} catch (ex) {
  console.log(`The following error has ocurred: ${ex}`);
}
