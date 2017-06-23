import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

import setupStore from './store';
import Router from './router';

const history = createHistory();
const store = setupStore(history);

export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <ConnectedRouter history={history}>
          <Router />
        </ConnectedRouter>
      </Provider>
    );
  }
}
