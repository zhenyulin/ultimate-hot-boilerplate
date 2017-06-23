import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import reducer from './reducer';

export default function setupStore(history) {
  const middleware = [
    routerMiddleware(history),
  ];
  const store = applyMiddleware(...middleware)(createStore)(reducer);

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
