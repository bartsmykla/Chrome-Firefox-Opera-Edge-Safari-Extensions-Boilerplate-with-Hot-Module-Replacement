[![Build Status](https://travis-ci.org/tranotheron/Chrome-Firefox-Opera-Edge-Safari-Extensions-Boilerplate-with-Hot-Module-Replacement.svg?branch=master)](https://travis-ci.org/tranotheron/Chrome-Firefox-Opera-Edge-Safari-Extensions-Boilerplate-with-Hot-Module-Replacement)
[![codecov](https://codecov.io/gh/tranotheron/Chrome-Firefox-Opera-Edge-Safari-Extensions-Boilerplate-with-Hot-Module-Replacement/branch/master/graph/badge.svg)](https://codecov.io/gh/tranotheron/Chrome-Firefox-Opera-Edge-Safari-Extensions-Boilerplate-with-Hot-Module-Replacement)
[![dependencies up to date](https://david-dm.org/tranotheron/Chrome-Firefox-Opera-Edge-Safari-Extensions-Boilerplate-with-Hot-Module-Replacement.svg)](https://david-dm.org/tranotheron/Chrome-Firefox-Opera-Edge-Safari-Extensions-Boilerplate-with-Hot-Module-Replacement)
[![Known Vulnerabilities](https://snyk.io/test/github/tranotheron/chrome-firefox-opera-edge-safari-extensions-boilerplate-with-hot-module-replacement/badge.svg)](https://snyk.io/test/github/tranotheron/chrome-firefox-opera-edge-safari-extensions-boilerplate-with-hot-module-replacement)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2565ba5ed9d842d58e49a90f50602e63)](https://www.codacy.com/app/tranotheron/Chrome-Firefox-Opera-Edge-Safari-Extensions-Boilerplate-with-Hot-Module-Replacement?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=tranotheron/Chrome-Firefox-Opera-Edge-Safari-Extensions-Boilerplate-with-Hot-Module-Replacement&amp;utm_campaign=Badge_Grade)

# Chrome, Firefox, Opera, Edge and Safari Extensions Boilerplate with Hot Module Replacement

[![Greenkeeper badge](https://badges.greenkeeper.io/tranotheron/Chrome-Firefox-Opera-Edge-Safari-Extensions-Boilerplate-with-Hot-Module-Replacement.svg)](https://greenkeeper.io/)
Boilerplate code to Browser Extensions (Chrome, Firefox, Opera, Edge, Safari) with Hot Module Replacement (webpack) and React + Redux

My reasons why I created this boilerplate code was to prepare reusable code for writing browser extensions, not only for Chrome, but Firefox, Opera, Edge, Safari too. I couldn't find anything which was working with **React** and **Hot Module Replacement** IN **content_scripts** (yes, it's working).

### TODO

- [ ] Chai assertions (should) in Nightwatch's e2e tests;
- [ ] Add Cucumber's Gherkin features, and something to generate documentations from it (I really like BDD);
- [ ] Prepare good README file ;-);
- [ ] Improve solution for auto technical documentation generation (right now it's esdoc, but it's not working well with stateless React components). Try to fight with react-docgen maybe?);
- [ ] Improve code coverage to being included files which have no specs written for them;
- [ ] Add some automatic style guide generator for React components;
- [ ] Try to improve building speed of hot replacement modules;
