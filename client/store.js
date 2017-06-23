import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createTracker } from 'redux-segment';

import reducer from './reducer';

export default function setupStore(history) {
  const middleware = [
    routerMiddleware(history),
    createTracker(),
  ];

  let store;

  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    /* eslint-enable */
    const enhancer = composeEnhancers(applyMiddleware(...middleware));
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
