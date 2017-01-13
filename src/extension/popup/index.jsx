/* eslint-disable no-console, global-require, flowtype/require-parameter-type */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as Hot } from 'react-hot-loader'; // eslint-disable-line
import Popup from './Popup';

let bookmarkElem = document.getElementById('popup');

/**
 * render
 * @param  {ReactClass} Component describe
 * @param  {HTMLElement} domElem   hhh
 * @return {something}           tak
 */
const render = (Component:ReactClass, domElem:HTMLElement) => {
  ReactDOM.render(<Hot><Component /></Hot>, domElem);
};

if (module.hot) {
  if (!bookmarkElem) {
    bookmarkElem = document.createElement('div');
    bookmarkElem.id = 'bookmark';
    document.getElementByName('body').appendChild(bookmarkElem);
  }
  module.hot.accept('./Popup', () => {
    chrome.runtime.sendMessage('hobdbfebcdiplemabfbcaenjphgaljll', { type: 'reload' }, response => console.log(response));
    const NewPopup = require('./Popup').default; // eslint-disable-line
    render(NewPopup, bookmarkElem);
  });
}

render(Popup, bookmarkElem);
