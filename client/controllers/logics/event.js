import fetch from 'isomorphic-fetch';
import { createLogic } from 'redux-logic';

import { MESSAGE, messageActions } from 'controllers/actions/event';

const getMessageLogic = createLogic({
  type: MESSAGE.GET,
  process({ getState, action }, dispatch, done) {
    const index = getState().count.get('current');
    fetch(`/message/${index}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        const err = {
          code: response.status,
          message: response.statusText,
        };
        dispatch(messageActions.error(err));
        return done();
      })
      .then(data => dispatch(messageActions.receive(data)))
      .catch(err => dispatch(messageActions.error(err)))
      .then(() => done());
  },
});

export default [getMessageLogic];
