import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import count from './count';

const reducer = combineReducers({
  count,
  router,
});

export default reducer;
