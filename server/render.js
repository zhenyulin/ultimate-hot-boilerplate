import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

import AppContainer from '../client/container';
import setupStore from '../client/store';
import indexPage from '../client/index.html';

export default function renderApp(path, callback) {
  const store = setupStore();
  const state = store.getState();

  const rendered = renderToString(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
  );

  const page = indexPage
    .replace('<!-- CONTENT -->', rendered)
    .replace('"-- STORES --"', JSON.stringify(state));

  callback(null, page);
}
