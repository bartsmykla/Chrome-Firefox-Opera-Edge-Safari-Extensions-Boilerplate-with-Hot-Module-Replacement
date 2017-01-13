let env = '';

switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
  env = 'production';
  break;
  case 'beta':
  env = 'beta';
  break;
  case 'staging':
  env = 'staging';
  break;
  case 'dev':
  case 'development':
  default:
  env = 'development';
  break;
}

module.exports = [
  require(`./chrome.webpack.js`)({ env, browser: 'chrome' }),
  require(`./firefox.webpack.js`)({ env, browser: 'firefox' }),
  require(`./opera.webpack.js`)({ env, browser: 'opera' }),
  require(`./edge.webpack.js`)({ env, browser: 'edge' }),
  require(`./safari.webpack.js`)({ env, browser: 'safari' }),
];
