import { request } from 'graphql-request';
import { createLogic } from 'redux-logic';
import { normalize } from 'normalizr';

import {
  POST,
  postActions,
  COMMENT,
  commentActions,
} from 'controllers/actions/post';

import postListSchema from 'controllers/schemas/post';

const getPostListLogic = createLogic({
  type: POST.GET,
  process(deps, dispatch, done) {
    const query = `{
      posts {
        _id,
        title,
        body,
        comments {
          _id,
          author {
            _id,
            name,
            email,
          }
          content,
        },
      }
    }`;
    request('/post/', query)
      .then(response => response.posts)
      .then(data => {
        dispatch(postActions.receive(data));
        // TODO: integrate normalize function into the action-manager reducer?
        dispatch(postActions.normalize(normalize(data, postListSchema)));
        dispatch(postActions.select(data[0]._id));
      })
      .catch(err => dispatch(postActions.error(err)))
      .then(() => done());
  },
});

const addCommentLogic = createLogic({
  type: COMMENT.ADD,
  process({ action }, dispatch, done) {
    const { postId, content, authorName, authorEmail } = action.payload;
    const query = `mutation {
      addComment(
        _id: "${postId}",
        input: {
          content: "${content}",
          author: {
            name: "${authorName}",
            email: "${authorEmail}",
          }
        }
      ) {
        _id,
        title,
        body,
        comments {
          _id
          content,
          author {
            _id,
            name,
            email,
          }
        }
      }
    }`;
    request('/post/', query)
      .then(({ addComment }) => dispatch(commentActions.addSuccess(addComment)))
      .then(() => done());
  },
});

const deleteCommentLogic = createLogic({
  type: COMMENT.DELETE,
  process({ action }, dispatch, done) {
    const { id } = action.payload;
    const query = `mutation {
      deleteComment(_id: "${id}") {
        _id
      }
    }`;
    request('/post/', query)
      .then(({ deleteComment }) =>
        dispatch(commentActions.deleteSuccess(deleteComment)),
      )
      .then(() => done());
  },
});

export default [getPostListLogic, addCommentLogic, deleteCommentLogic];
