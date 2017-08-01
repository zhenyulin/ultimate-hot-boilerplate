import React from 'react';
import { Route, Switch } from 'react-router';

import Home from 'containers/home';
import Second from 'containers/second';
import ChartExample from 'containers/chart-example';

export default () =>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/second" component={Second} />
    <Route path="/chart" component={ChartExample} />
  </Switch>;
