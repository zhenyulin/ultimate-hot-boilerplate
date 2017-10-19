import fetch from 'isomorphic-fetch';
import { createLogic } from 'redux-logic';

import { MESSAGE, messageActions } from 'controllers/actions/event';

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

export default [getMessageLogic];
