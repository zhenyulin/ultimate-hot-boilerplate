import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';

import GlobalStyle from 'utils/style/global';
import setupStore from './store';
import setupApollo from './apollo';
import Router from './router';
import { colors } from './theme';

const client = setupApollo();
const history = createHistory();
const store = setupStore(history);

export default () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ThemeProvider theme={colors}>
        <GlobalStyle>
          <ConnectedRouter history={history}>
            <Router />
          </ConnectedRouter>
        </GlobalStyle>
      </ThemeProvider>
    </Provider>
  </ApolloProvider>
);
