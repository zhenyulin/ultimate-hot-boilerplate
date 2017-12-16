import fetch from 'isomorphic-fetch';
import { createLogic } from 'redux-logic';

import { POSTS, Posts, COMMENTS, Comments } from 'controllers/actions/blog-d';

const getPostListLogic = createLogic({
  type: POSTS.GET,
  process(deps, dispatch, done) {
    fetch('/rest/populated/posts')
      .then(res => res.json())
      .then(data => {
        dispatch(Posts.got(data));
        dispatch(Posts.select(data[0]._id));
      })
      .catch(err => dispatch(Posts.error(err)))
      .then(() => done());
  },
});

const addCommentLogic = createLogic({
  type: COMMENTS.ADD,
  process({ action }, dispatch, done) {
    const { postId, content, authorName, authorEmail } = action.payload;
    fetch(`/rest/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        author: {
          name: authorName,
          email: authorEmail,
        },
      }),
    })
      .then(res => res.json())
      .then(data => dispatch(Comments.added(data)))
      .catch(err => dispatch(Posts.error(err)))
      .then(() => done());
  },
});

const removeCommentLogic = createLogic({
  type: COMMENTS.REMOVE,
  process({ action }, dispatch, done) {
    const { id, cid } = action.payload;
    fetch(`/rest/posts/${id}/comments/${cid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(deletedCommentInPost =>
        dispatch(Comments.removed(deletedCommentInPost)),
      )
      .catch(err => dispatch(Posts.error(err)))
      .then(() => done());
  },
});

export default [getPostListLogic, addCommentLogic, removeCommentLogic];
