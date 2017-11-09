import { asyncActionBundle } from 'utils/action-manager';

export const [POST, postActions] = asyncActionBundle('@event/POST');

export const COMMENT = {
  ADD: '@event/COMMENT/ADD',
  ADD_SUCCESS: '@event/COMMENT/ADD/SUCCESS',
  DELETE: '@event/COMMENT/DELETE',
  DELETE_SUCCESS: '@event/COMMENT/DELETE/SUCCESS',
};

export const commentActions = {
  add: ({ postId, content, authorName, authorEmail }) => ({
    type: COMMENT.ADD,
    payload: {
      postId,
      content,
      authorName,
      authorEmail,
    },
  }),
  delete: id => ({
    type: COMMENT.DELETE,
    payload: { id },
  }),
  addSuccess: updatedPost => ({
    type: COMMENT.ADD_SUCCESS,
    payload: {
      updatedPost,
    },
  }),
  deleteSuccess: deletedComment => ({
    type: COMMENT.DELETE_SUCCESS,
    payload: {
      deletedComment,
    },
  }),
};

export default {
  POST,
  postActions,
};
