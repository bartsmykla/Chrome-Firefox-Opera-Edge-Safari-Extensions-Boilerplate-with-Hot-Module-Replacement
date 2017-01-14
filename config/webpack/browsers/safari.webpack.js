const commonConfig = require('../common.webpack');

module.exports = function (options) {
  const config = commonConfig(options);

  // in Safari you have, and should use relative paths of injected scripts to
  // popups and background, because other so it's not working
  config.output.publicPath = '../';

  return config;
};
