import { combineReducers } from 'redux-immutable';
import { defaultImmutableAsyncReducers } from 'utils/action-manager';

import { POSTS, COMMENTS, AUTHORS } from 'controllers/actions/blog-a';

export default combineReducers({
  posts: defaultImmutableAsyncReducers(POSTS),
  comments: defaultImmutableAsyncReducers(COMMENTS),
  authors: defaultImmutableAsyncReducers(AUTHORS),
});
