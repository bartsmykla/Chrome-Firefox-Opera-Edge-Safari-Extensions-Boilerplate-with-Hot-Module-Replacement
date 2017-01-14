const BROWSER = (!process.env.__BROWSER__)
  ? 'chrome'
  : process.env.__BROWSER__;

let ENV = '';

if (['chrome', 'firefox', 'edge', 'safari', 'opera', 'all'].indexOf(BROWSER) === -1) {
  throw `We are not supporting this browser: ${BROWSER}`;
}

switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
  ENV = 'production';
  break;
  case 'beta':
  ENV = 'beta';
  break;
  case 'staging':
  ENV = 'staging';
  break;
  case 'test':
  case 'testing':
  // module.exports = require('./config/webpack.test.js')({ env: 'test'});
  // break;
  case 'dev':
  case 'development':
  default:
  ENV = 'development';
}

if (BROWSER === 'all') {
  module.exports = require('./config/webpack/browsers/allbrowsers.webpack.js');
} else {
  module.exports = require(`./config/webpack/browsers/${BROWSER}.webpack.js`)({ env: ENV, browser: BROWSER });
}
