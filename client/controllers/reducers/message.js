import { fromJS } from 'immutable';
import { MESSAGE } from 'controllers/actions/message';

const initialState = fromJS({
  message: {},
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MESSAGE.RECEIVE:
      return state.mergeDeep({ message: action.payload });
    default:
      return state;
  }
}
