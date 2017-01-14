const commonConfig = require('../common.webpack');
const helpers = require('../../helpers');

module.exports = function (options) {
  const config = commonConfig(options);

  console.log('output', config.output.path);

  config.output.path = helpers.root(`build/safari/${helpers.upperCamelizedName}.safariextension`)

  // in Safari you have, and should use relative paths of injected scripts to
  // popups and background, because other so it's not working
  config.output.publicPath = '../';

  return config;
};
