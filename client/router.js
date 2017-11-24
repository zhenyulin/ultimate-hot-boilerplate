// @flow

import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import { pagenameToRoute } from 'utils/parser/routes';

import Home from 'containers/home';
import Second from 'containers/second';

const pagesToComponent = {
  Home,
  Second,
};

export const pages = Object.keys(pagesToComponent);

export default () => (
  <Switch>
    {pages.map(p => (
      <Route
        key={p}
        path={pagenameToRoute(p)}
        component={pagesToComponent[p]}
      />
    ))}
    <Redirect from="/" to={pagenameToRoute(pages[0])} />
  </Switch>
);
