import { defaultImmutableAsyncReducers } from 'utils/action-manager';

import { POSTS } from 'controllers/actions/blog-b';

export default defaultImmutableAsyncReducers(POSTS);
