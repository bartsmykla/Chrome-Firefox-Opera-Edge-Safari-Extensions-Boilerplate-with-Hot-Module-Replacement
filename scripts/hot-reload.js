const argv = require('minimist')(process.argv.slice(2));
const WebpackDevServer = require('webpack-dev-server');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const webpack = require('webpack');
const config = require('../webpack.config');
const helpers = require('../config/helpers');
const defaults = require('../config/defaults');

const options = {};
const excludeEntriesToHotReload = [ 'injector' ];
const PORT = argv['hmr-port'] || defaults.HMR_PORT || 3000;

console.log('Starting WebpackDevServer debug');

config.cache = true;
config.devtool = 'eval';
config.entry.injector = [
  './extension/injector.js'
];
delete config.entry.vendor;

// Prepare manifest.json for Hot Module Replacement
config.plugins = config.plugins.map(plugin => {
  if (plugin instanceof GenerateJsonPlugin && plugin.filename === 'manifest.json') {
    plugin.value.content_security_policy = "script-src 'self' http://localhost:3000 https://localhost:3000 'unsafe-eval'; object-src 'self'"
    plugin.value.externally_connectable = {
      "matches": ["https://mail.google.com/*"],
    },
    plugin.value.web_accessible_resources = plugin.value.web_accessible_resources.concat([
      "*.json",
      "*.js",
    ]);
    plugin.value.content_scripts[0].js = ["injector.js"];
  } else if (plugin instanceof HtmlPlugin) {
    plugin.options.chunks = plugin.options.chunks.filter(chunk => ['common', 'vendor'].indexOf(chunk) === -1);
  }
  return plugin;
});

config.plugins = [
  new HtmlPlugin({
    template: helpers.root('scripts/hot-reload.html'),
    inject: true,
    minify: {
      removeComments: false,
      collapseWhitespace: false,
      keepClosingSlash: false
    }
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.NamedModulesPlugin(),
  new WriteFilePlugin(),
  new webpack.LoaderOptionsPlugin({
    debug: true,
    minimize: false
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

try {

  const compiler = webpack(config);

  const server = new WebpackDevServer(compiler,{
    https: true,
    contentBase: helpers.root('dist'),
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
