import { combineReducers } from 'redux-immutable';
import { immutableAsyncReducers } from 'utils/action-manager';

import { MESSAGE, POST } from 'controllers/actions/event';

export default combineReducers({
  message: immutableAsyncReducers(MESSAGE),
  post: immutableAsyncReducers(POST),
});
