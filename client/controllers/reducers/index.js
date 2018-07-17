import { combineReducers } from 'redux-immutable';
import { routerReducer as router } from 'react-router-redux';
import { defaultImmutableAsyncReducers } from 'utils/action-manager';

import { MESSAGE } from 'controllers/actions/message';

import count from './count';
import blogA from './blog-a';
import blogB from './blog-b';
import blogC from './blog-c';
import blogD from './blog-d';

export default combineReducers({
  router,
  count,
  message: defaultImmutableAsyncReducers(MESSAGE),
  blogA,
  blogB,
  blogC,
  blogD,
});
