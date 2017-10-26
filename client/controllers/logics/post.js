import { request } from 'graphql-request';
import { createLogic } from 'redux-logic';
import { normalize } from 'normalizr';

import { POST, postActions } from 'controllers/actions/post';

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
      })
      .catch(err => dispatch(postActions.error(err)))
      .then(() => done());
  },
});

export default [getPostListLogic];
