import { combineReducers } from 'redux-immutable';
import { routerReducer as router } from 'react-router-redux';
import { defaultImmutableAsyncReducers } from 'utils/action-manager';

import { MESSAGE } from 'controllers/actions/message';

import count from './count';
import blog from './blog';

export default combineReducers({
  router,
  count,
  message: defaultImmutableAsyncReducers(MESSAGE),
  blog,
});
