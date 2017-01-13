/* eslint-env webextensions */

/* istanbul ignore if */
if (process.env.NODE_ENV === 'development' && chrome.extension) {
  ['dll__vendor.js', 'sidebar/sidebar.js'].forEach((item) => {
    const s = document.createElement('script');
    s.src = chrome.extension.getURL(item);
    (document.head || document.documentElement).appendChild(s);
  });
}
