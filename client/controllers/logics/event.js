import fetch from 'isomorphic-fetch';
import { request } from 'graphql-request';
import { createLogic } from 'redux-logic';
import { normalize } from 'normalizr';

import {
  MESSAGE,
  messageActions,
  POST,
  postActions,
} from 'controllers/actions/event';

import postListSchema from 'controllers/schemas/post';

const getMessageLogic = createLogic({
  type: MESSAGE.GET,
  process({ getState }, dispatch, done) {
    const index = getState().count.get('current');
    fetch(`/message/${index}`)
      .then(response => response.json())
      .then(data => dispatch(messageActions.receive(data)))
      .catch(err => dispatch(messageActions.error(err)))
      .then(() => done());
  },
});

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

export default [getMessageLogic, getPostListLogic];
