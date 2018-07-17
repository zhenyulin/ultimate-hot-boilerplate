// @flow

import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import { pagenameToRoute } from 'utils/parser/routes';

import Home from 'containers/home';
import BlogA from 'containers/blog-a';
import BlogB from 'containers/blog-b';
import BlogC from 'containers/blog-c';
import BlogD from 'containers/blog-d';

const pagesToComponent = {
  Home,
  BlogA,
  BlogB,
  BlogC,
  BlogD,
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
