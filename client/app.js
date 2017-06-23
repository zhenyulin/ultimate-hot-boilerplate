import React, { Component } from 'react';
import { Provider } from 'react-redux';

import AppContainer from './container';
import setupStore from './store';

const store = setupStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <AppContainer />
      </Provider>
    );
  }
}
