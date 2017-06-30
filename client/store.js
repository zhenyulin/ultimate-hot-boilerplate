import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import { createTracker } from 'redux-segment';

import reducer from './controllers/reducers';

export default function setupStore(history) {
  const middleware = [
    routerMiddleware(history),
    createTracker(),
  ];

  if (process.env.NODE_ENV === 'development') {
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
