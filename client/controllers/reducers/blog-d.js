import { fromJS } from 'immutable';
import {
  defaultImmutableHandlerMap,
  createReducers,
} from 'utils/action-manager';

import { POSTS, COMMENTS } from 'controllers/actions/blog-d';

const handlerMap = {
  ...defaultImmutableHandlerMap(POSTS),
  [COMMENTS.ADD]: (state, action) => {
    const { postId, content, authorName, authorEmail } = action.payload;
    const newAuthor = {
      _id: '-1',
      name: authorName,
      email: authorEmail,
    };
    const newComment = {
      _id: '-2',
      content,
      author: newAuthor,
    };
    const posts = state.get('data');
    const updatedPosts = posts.update(
      posts.findIndex(post => post.get('_id') === postId),
      post =>
        post.update('comments', comments => comments.push(fromJS(newComment))),
    );
    const updatedState = state.set('data', updatedPosts);
    return updatedState;
  },
  [COMMENTS.ADDED]: (state, action) => {
    const updatedPost = action.payload;
    const postId = updatedPost._id;
    const posts = state.get('data');
    const updatedPosts = posts.update(
      posts.findIndex(post => post.get('_id') === postId),
      () => fromJS(updatedPost),
    );
    const updatedState = state.set('data', updatedPosts);
    return updatedState;
  },
  [COMMENTS.REMOVE]: (state, action) => {
    const { id, cid } = action.payload;
    const posts = state.get('data');
    const updatedPosts = posts.update(
      posts.findIndex(post => post.get('_id') === id),
      post =>
        post.update('comments', comments =>
          comments.filter(comment => comment.get('_id') !== cid),
        ),
    );
    const updatedState = state.set('data', updatedPosts);
    return updatedState;
  },
  [COMMENTS.REMOVED]: (state, action) => {
    const deletedCommentInPost = action.payload;
    const { _id } = deletedCommentInPost;
    const posts = state.get('data');
    const updatedPosts = posts.update(
      posts.findIndex(post => post.get('_id') === _id),
      post =>
        post.update('comments', () => fromJS(deletedCommentInPost.comments)),
    );
    const updatedState = state.set('data', updatedPosts);
    return updatedState;
  },
};

export default createReducers(handlerMap);
