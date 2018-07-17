import { request } from 'graphql-request';
import { createLogic } from 'redux-logic';

import { POSTS, Posts, COMMENTS, Comments } from 'controllers/actions/blog-c';

const getPostListLogic = createLogic({
  type: POSTS.GET,
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
    request('/graphql/', query)
      .then(response => response.posts)
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
    request('/graphql/', query)
      .then(({ addComment }) => dispatch(Comments.added(addComment)))
      .catch(err => dispatch(Posts.error(err)))
      .then(() => done());
  },
});

const removeCommentLogic = createLogic({
  type: COMMENTS.REMOVE,
  process({ action }, dispatch, done) {
    const { id, cid } = action.payload;
    const query = `mutation {
      deleteComment(id: "${id}", cid: "${cid}") {
        _id
        comments {
          _id
          content
          author {
            _id
            name
            email
          }
        }
      }
    }`;
    request('/graphql/', query)
      .then(({ deleteComment }) => dispatch(Comments.removed(deleteComment)))
      .catch(err => dispatch(Posts.error(err)))
      .then(() => done());
  },
});

export default [getPostListLogic, addCommentLogic, removeCommentLogic];
