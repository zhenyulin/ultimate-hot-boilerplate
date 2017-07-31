import { combineReducers } from 'redux-immutable';
import { immutableAsyncReducers } from 'utils/action-manager';

import { MESSAGE } from 'controllers/actions/event';

export default combineReducers({
  message: immutableAsyncReducers(MESSAGE),
});
