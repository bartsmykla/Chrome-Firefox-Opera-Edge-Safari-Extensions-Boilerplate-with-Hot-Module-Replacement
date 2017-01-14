const helpers = require('./helpers');

const json = {
  'Author': 'Bartłomiej Smykla <bartek@smykla.com>',
  'CFBundleDisplayName': helpers.upperCamelizedName,
  'CFBundleIdentifier': `com.yourcompany.${helpers.upperCamelizedName.toLowerCase()}`,
  'CFBundleInfoDictionaryVersion': '6.0',
  'CFBundleShortVersionString': helpers.version,
  'CFBundleVersion': helpers.version,
  'Chrome': {
    'Global Page': 'background/background.html',
    'Popovers': [],
    'Toolbar Items': []
  },
  'Content': {
    'Scripts': {
      'Start': [],
      'End': [],
    },
    'Whitelist': [],
    'Blacklist': [],
  },
  'Description': helpers.manifest.description,
  'DeveloperIdentifier': '0000000000',
  'ExtensionInfoDictionaryVersion': '1.0',
  'Permissions': {
    'Website Access': {
      'Include Secure Pages': true,
      'Level': 'All'
    }
  },
  'Website': '',
};

module.exports = json;
