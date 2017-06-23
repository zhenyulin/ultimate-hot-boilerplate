import { Map } from 'immutable';
import { ADD } from 'controllers/actions/count';

const initialState = Map({
  current: 0,
});

function addCount(state) {
  return Map({
    current: state.get('current') + 1,
  });
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return addCount(state);
    default:
      return state;
  }
}
