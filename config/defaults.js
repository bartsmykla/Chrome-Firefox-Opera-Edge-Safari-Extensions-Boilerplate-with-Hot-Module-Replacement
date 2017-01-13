const helpers = require('./helpers');

const { root } = helpers;

module.exports = {
  HMR_PORT: 3000,
  SSR_PORT: 3001,
  API_PORT: 8000,
  API_HOST: 'localhost',
  PROTOCOL: 'https',
  HOST: 'localhost',
  ROOT_DIR: root(),
  SRC_DIR: root('src'),
  DIST_DIR: root('dist'),
  ASSETS_DIR: root('dist'),
};
