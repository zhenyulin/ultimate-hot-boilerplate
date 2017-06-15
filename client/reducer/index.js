import { Map } from 'immutable';
import { ADD } from '../action/';

const initialState = Map({
  count: 0
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return addCount(state);
    default:
      return state;
  }
}

function addCount(state) {
  return Map({
    count: state.get('count') + 1
  });
}
