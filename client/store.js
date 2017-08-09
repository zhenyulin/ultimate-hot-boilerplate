import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogicMiddleware } from 'redux-logic';
import { createTracker } from 'redux-segment';

import reducer from './controllers/reducers';
import logics from './controllers/logics/';

export default function setupStore(history) {
  const middleware = [
    routerMiddleware(history),
    createLogicMiddleware(logics),
    createTracker(),
  ];

  if (process.env.NODE_ENV === 'development') {
    const composeWithDevTools = require('redux-devtools-extension')
      .composeWithDevTools;
    const enhancer = composeWithDevTools(applyMiddleware(...middleware));
    const store = createStore(reducer, enhancer);

    if (module.hot) {
      module.hot.accept('./controllers/reducers', () => {
        const nextRootReducer = require('./controllers/reducers').default;
        store.replaceReducer(nextRootReducer);
      });
    }

    return store;
  }

  return applyMiddleware(...middleware)(createStore)(reducer);
}
