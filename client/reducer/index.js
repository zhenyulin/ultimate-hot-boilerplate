import { combineReducers } from 'redux';

import count from './count';
import { routerReducer as router } from 'react-router-redux';

const reducer = combineReducers({
  count,
  router,
});

export default reducer;
