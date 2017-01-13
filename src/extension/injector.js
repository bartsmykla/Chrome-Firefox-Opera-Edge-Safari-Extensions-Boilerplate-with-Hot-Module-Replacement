/* eslint-env webextensions */

/* istanbul ignore if */
if (process.env.NODE_ENV === 'development' && chrome.extension) {
  const s = document.createElement('script');
  s.src = chrome.extension.getURL('sidebar/sidebar.js');
  (document.head || document.documentElement).appendChild(s);
}
