import fetch from 'isomorphic-fetch';
import { createLogic } from 'redux-logic';

import {
  GET_MESSAGE,
  getMessageSuccess,
  getMessageFail,
} from 'controllers/actions/message';

const getMessageLogic = createLogic({
  type: GET_MESSAGE,
  process({ getState, action }, dispatch, done) {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(data => dispatch(getMessageSuccess(data)))
    .catch(err => dispatch(getMessageFail(err)))
    .then(() => done());
  },
});

export default [
  getMessageLogic,
];
