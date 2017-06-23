import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import createMemoryHistory from 'history/createMemoryHistory';
import { ConnectedRouter } from 'react-router-redux';

import setupStore from './store';
import Router from './router';
import indexPage from './index.html';

export default function serverSideRender() {
  const history = createMemoryHistory();
  const store = setupStore(history);
  const state = store.getState();

  const rendered = renderToString(
    <Provider store={store} >
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    </Provider>,
  );

  const page = indexPage
    .replace('<!-- CONTENT -->', rendered)
    .replace('"-- STORES --"', JSON.stringify(state));

  return page;
}
