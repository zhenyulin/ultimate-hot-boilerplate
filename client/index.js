import React from 'react';
import { render } from 'react-dom';

import App from './app';

const renderToPage = Component => {
  render(<Component />, document.getElementById('app'));
};

renderToPage(App);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app', () => {
    const HotApp = require('./app').default;
    renderToPage(HotApp);
  });
}

console.log('Version:', window.CONFIG.VERSION);
