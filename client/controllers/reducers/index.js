import { combineReducers } from 'redux-immutable';
import { routerReducer as router } from 'react-router-redux';
import { immutableAsyncReducers } from 'utils/action-manager';

import { MESSAGE } from 'controllers/actions/message';
import { POST } from 'controllers/actions/post';

import count from './count';

export default combineReducers({
  router,
  count,
  message: immutableAsyncReducers(MESSAGE),
  post: immutableAsyncReducers(POST),
});
