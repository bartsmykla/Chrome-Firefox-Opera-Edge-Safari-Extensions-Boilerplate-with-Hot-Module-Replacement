const commonConfig = require('./common.webpack');
const helpers = require('../helpers');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const CrxPlugin = require('crx-webpack-plugin');
const { root, ifProd, removeEmpty, version } = helpers;
const locales = {
  pl: require(root(`locales/pl/`))
}

const chromePlugins = removeEmpty([
  new GenerateJsonPlugin('manifest.json', require(root(`src/extension/manifest.json`))),
  locales.pl ? new GenerateJsonPlugin('_locales/pl/messages.json', locales.pl) : undefined,
  ifProd(new CrxPlugin({
    keyFile: '../key.pem',
    contentPath: '../../build/chrome',
    outputPath: '../../build',
    name: `twist-chrome_${version}_${process.env.NODE_ENV.toLowerCase()}`
  })),
]);

module.exports = function (options) {
  const config = commonConfig(options);
  config.plugins = config.plugins.concat(chromePlugins);
  return config;
};
