const requireGLob = require('require-glob');
const helpers = require('../../config/helpers');

const { flatten } = helpers;

module.exports = flatten(requireGLob.sync(['**/*.json']), {}, 'LOCALES');
