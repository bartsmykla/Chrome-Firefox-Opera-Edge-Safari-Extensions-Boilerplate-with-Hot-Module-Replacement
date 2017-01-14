const jetpack = require('fs-jetpack');
const browsers = !process.env.__BROWSER__
  ? [ 'chrome' ]
  : (process.env.__BROWSER__ !== 'all')
    ? [ process.env.__BROWSER__.toLowerCase() ]
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
