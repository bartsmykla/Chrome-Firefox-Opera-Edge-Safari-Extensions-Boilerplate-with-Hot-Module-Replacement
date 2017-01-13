const jetpack = require('fs-jetpack');
const browsers = !process.env.TWIST_BROWSER_BUILD
  ? [ 'chrome' ]
  : (process.env.TWIST_BROWSER_BUILD !== 'all')
    ? [ process.env.TWIST_BROWSER_BUILD.toLowerCase() ]
    : [ 'chrome', 'firefox', 'opera', 'edge', 'safari' ];

const copyTask = (browser) => jetpack.copyAsync('src/extension', `build/${browser}`, {
  overwrite: true,
  matching: [
    './background/background.html',
    './bookmark/popup.html',
    './images/**/*.{png,jpg,gif}',
  ]
});

browsers.forEach(browser => copyTask(browser));
