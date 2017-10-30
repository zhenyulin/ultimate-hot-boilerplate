import { ADD } from 'controllers/actions/count';

const initialState = 0;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
}
