import { combineReducers } from 'redux-immutable';
import { routerReducer as router } from 'react-router-redux';
import { defaultImmutableAsyncReducers } from 'utils/action-manager';

import { MESSAGE } from 'controllers/actions/message';
import { COMMENT, AUTHOR } from 'controllers/actions/post';

import count from './count';
import post from './post';

export default combineReducers({
  router,
  count,
  message: defaultImmutableAsyncReducers(MESSAGE),
  post,
  comment: defaultImmutableAsyncReducers(COMMENT),
  author: defaultImmutableAsyncReducers(AUTHOR),
});
