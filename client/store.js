import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createTracker } from 'redux-segment';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';

export default function setupStore(history) {
  const middleware = [
    routerMiddleware(history),
    createTracker(),
  ];

  let store;

  if (process.env.NODE_ENV === 'development') {
    const enhancer = composeWithDevTools(applyMiddleware(...middleware));
    store = createStore(reducer, enhancer);
  } else {
    store = applyMiddleware(...middleware)(createStore)(reducer);
  }

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
