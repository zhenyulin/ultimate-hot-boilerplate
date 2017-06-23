import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import Index from './container/index';
import Second from './container/second';

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
