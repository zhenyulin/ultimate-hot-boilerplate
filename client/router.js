import React, { Component } from 'react';
import { Route } from 'react-router';

import Index from './container/index';
import Second from './container/second';

export default class Router extends Component {
  render() {
    return (
      <div>
        <Route path="/second" component={Second} />
        <Route path="/" component={Index} exact />
      </div>
    );
  }
}
