const argv = require('minimist')(process.argv.slice(2));
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const commonConfig = require('../common.webpack');
const helpers = require('../../helpers');
const CrxPlugin = require('crx-webpack-plugin');

const locales = {
  pl: require(helpers.root('locales/pl/')),
}

const keyPath = argv.key ? helpers.root(argv.key) : helpers.root('key.pem');

const manifest = require(helpers.root(`src/extension/manifest.json`));

const chromePlugins = helpers.removeEmpty([
  new GenerateJsonPlugin('manifest.json', manifest),
  locales.pl ? new GenerateJsonPlugin('_locales/pl/messages.json', locales.pl) : undefined,
  helpers.ifRelease(new CrxPlugin({
    keyFile: keyPath,
    contentPath: helpers.root('build/chrome'),
    outputPath: helpers.root('releases'),
    name: `${helpers.packageJson.name}-chrome_${helpers.version}_${process.env.NODE_ENV}`,
  })),
]);

module.exports = function (options) {
  const config = commonConfig(options);
  config.plugins = config.plugins.concat(chromePlugins);
  return config;
};
