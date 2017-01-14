const commonConfig = require('../common.webpack');
const helpers = require('../../helpers');
const manifestPlist = require('../../manifest.plist');

const GeneratePlistPlugin = require('generate-plist-webpack-plugin');

manifestPlist['Chrome']['Global Page'] = helpers.manifest.background.page;
manifestPlist['Chrome']['Popovers'] = [
  {
    'Filename': helpers.manifest.browser_action.default_popup,
    'Identifier': 'popup',
  }
];
manifestPlist['Chrome']['Toolbar Items'] = [
  {
    'Identifier': 'toolbar',
    'Image': helpers.manifest.browser_action.default_icon,
    'Include By Default': true,
    'Label': helpers.manifest.name,
    'Palette Label': helpers.manifest.name,
    'Popover': 'popup',
    'Tool Tip': helpers.manifest.name,
  }
];

const contentScripts = helpers.manifest.content_scripts;
const startScripts = helpers.manifest.content_scripts.filter(script => script.run_at === 'document_start');
const endScripts = helpers.manifest.content_scripts.filter(script => (!script.run_at || script.run_at === 'document_end'));

manifestPlist['Content']['Scripts']['Start'] = startScripts.reduce((acc, next) => acc.concat(next.js),[]);
manifestPlist['Content']['Scripts']['End'] = endScripts.reduce((acc, next) => acc.concat(next.js),[]);
manifestPlist['Content']['Whitelist'] = contentScripts.reduce((acc, next) => acc.concat(next.matches), [])

const safariPlugins = helpers.removeEmpty([
  new GeneratePlistPlugin('Info.plist', manifestPlist)
]);


module.exports = function (options) {
  const config = commonConfig(options);

  config.output.path = helpers.root(`build/safari/${helpers.upperCamelizedName}.safariextension`)

  // in Safari you have, and should use relative paths of injected scripts to
  // popups and background, because other so it's not working
  config.output.publicPath = '../';

  config.plugins = config.plugins.concat(safariPlugins);

  return config;
};
