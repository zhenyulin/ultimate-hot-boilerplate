import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import count from './count';
import message from './message';

const reducer = combineReducers({
  router,
  count,
  message,
});

export default reducer;
