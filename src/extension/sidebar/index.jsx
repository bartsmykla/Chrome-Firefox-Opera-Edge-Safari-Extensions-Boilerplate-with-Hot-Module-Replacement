/* eslint-disable no-console, no-undef, global-require, flowtype/require-parameter-type */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as Hot } from 'react-hot-loader'; // eslint-disable-line
import Sidebar from './Sidebar';

const findBar = () => {
  const bar = document.querySelector('.Cr.aqJ');
  const sidebar = document.createElement('div');
  sidebar.id = 'sidebar';

  /* istanbul ignore else  */
  if (!bar) {
    setTimeout(findBar, 400);
  } else {
    bar.appendChild(sidebar);

    ReactDOM.render(
      <Hot><Sidebar /></Hot>,
      document.getElementById('sidebar')
    );
  }
};

findBar();

/* istanbul ignore next  */
if (module.hot) {
  module.hot.accept('./Sidebar', () => {
    chrome.runtime.sendMessage('hobdbfebcdiplemabfbcaenjphgaljll', { type: 'reload' }, response => console.log(response));
    const NewSidebar = require('./Sidebar').default;
    ReactDOM.render(<Hot><NewSidebar /></Hot>, document.getElementById('sidebar'));
  });
}
