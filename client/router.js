import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import Home from 'containers/home';
import Second from 'containers/second';
import ChartExample from 'containers/chart-example';

export default class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/second" component={Second} />
        <Route path="/chart" component={ChartExample} />
      </Switch>
    );
  }
}
