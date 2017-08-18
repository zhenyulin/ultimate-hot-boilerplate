import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import count from './count';
import event from './event';

const reducer = combineReducers({
  router,
  count,
  event,
});

export default reducer;
