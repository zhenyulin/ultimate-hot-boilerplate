import { createStore } from 'redux';
import reducer from 'reducer';

export default function setupStore() {
  const store = createStore(reducer);

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
