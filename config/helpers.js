const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const helpers = {};
const manifest = require('../src/extension/manifest');
const argv = require('yargs').argv;
const colors = require('colors/safe');

const root = (...args) => {
  return path.join.apply(path, [ROOT].concat(args));
};

const pathJoin = (...args) => {
  return path.join.apply(path, args);
}

const doWhenIsEnv = (env, plugin) => {
  if (process.env.NODE_ENV === env) {
    return plugin;
  }
}

const env = (process.env.NODE_ENV) ? process.env.NODE_ENV.toLowerCase() : 'development';
const browser = (process.env.TWIST_BROWSER_BUILD) ? process.env.TWIST_BROWSER_BUILD.toLowerCase() : 'chrome';

const buildPath = (env === 'development') ? 'dist' : `build/${browser}`;

const ifProd = doWhenIsEnv.bind(null, 'production');
const ifDev = doWhenIsEnv.bind(null, 'development');

const removeEmpty = array => array.filter(item => !!item);

const version = manifest.version;

const flatten = (obj) => {
  const output = {};
  Object.keys(obj).forEach(key => Object.assign(output, obj[key]));
  return output;
}

module.exports = {
  root,
  ifProd,
  ifDev,
  removeEmpty,
  version,
  flatten,
  env,
  buildPath,
  pathJoin,
};
