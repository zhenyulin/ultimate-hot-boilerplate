import { fromJS } from 'immutable';
import {
  defaultImmutableHandlerMap,
  createReducers,
} from 'utils/action-manager';

import { POST, COMMENT } from 'controllers/actions/post';

const handlerMap = {
  ...defaultImmutableHandlerMap(POST),
  [COMMENT.ADD]: (state, action) => {
    const { postId, content, authorName, authorEmail } = action.payload;
    const newAuthor = {
      _id: '-1',
      name: authorName,
      email: authorEmail,
    };
    const newComment = {
      _id: '-2',
      content,
      author: newAuthor._id,
    };
    // normalised Approach
    // const updatedState = state
    //   .updateIn(
    //     ['normalized', 'entities', 'posts', postId, 'comments'],
    //     comments => comments.push(newComment._id),
    //   )
    //   .setIn(
    //     ['normalized', 'entities', 'comments', newComment._id],
    //     fromJS(newComment),
    //   )
    //   .setIn(
    //     ['normalized', 'entities', 'authors', newAuthor._id],
    //     fromJS(newAuthor),
    //   );
    // return updatedState;
    // Non-normalised Approach
    const posts = state.get('data');
    const updatedPosts = posts.update(
      posts.findIndex(post => post.get('_id') === postId),
      post =>
        post.update('comments', comments => comments.push(fromJS(newComment))),
    );
    const updatedState = state.set('data', updatedPosts);
    return updatedState;
  },
  [COMMENT.ADD_SUCCESS]: (state, action) => {
    const { updatedPost } = action.payload;
    const postId = updatedPost._id;
    const posts = state.get('data');
    const updatedPosts = posts.update(
      posts.findIndex(post => post.get('_id') === postId),
      () => fromJS(updatedPost),
    );
    const updatedState = state.set('data', updatedPosts);
    return updatedState;
  },
  [COMMENT.DELETE]: (state, action) => {
    const { id } = action.payload;
    const selectedPostId = state.get('selected');
    // normalised Approach
    // return state
    //   .deleteIn(['normalized', 'entities', 'comments', id])
    //   .updateIn(
    //     ['normalized', 'entities', 'posts', selectedPostId, 'comments'],
    //     comments => comments.filter(commentId => commentId !== id),
    //   );
    const posts = state.get('data');
    const updatedPosts = posts.update(
      posts.findIndex(post => post.get('_id') === selectedPostId),
      post =>
        post.update('comments', comments =>
          comments.filter(comment => comment.get('_id') !== id),
        ),
    );
    const updatedState = state.set('data', updatedPosts);
    return updatedState;
  },
  [COMMENT.DELETE_SUCCESS]: (state, action) => {
    const { deletedComment } = action.payload;
    const { _id } = deletedComment;
    const selectedPostId = state.get('selected');
    const posts = state.get('data');
    const updatedPosts = posts.update(
      posts.findIndex(post => post.get('_id') === selectedPostId),
      post =>
        post.update('comments', comments =>
          comments.filter(comment => comment.get('_id') !== _id),
        ),
    );
    const updatedState = state.set('data', updatedPosts);
    return updatedState;
  },
};

export default createReducers(handlerMap);
