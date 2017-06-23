import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import Index from './containers/index';
import Second from './containers/second';

export default class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/second" component={Second} />
      </Switch>
    );
  }
}
