import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

import GlobalStyle from 'utils/style/global';
import setupStore from './store';
import Router from './router';
import { colors } from './theme';

const history = createHistory();
const store = setupStore(history);

export default () =>
  <Provider store={store}>
    <ThemeProvider theme={colors}>
      <GlobalStyle>
        <ConnectedRouter history={history}>
          <Router />
        </ConnectedRouter>
      </GlobalStyle>
    </ThemeProvider>
  </Provider>;
