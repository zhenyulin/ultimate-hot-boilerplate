import { fromJS } from 'immutable';
import { GET_MESSAGE_SUCCESS } from 'controllers/actions/message';

const initialState = fromJS({
  message: {},
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGE_SUCCESS:
      return state.mergeDeep({ message: action.payload });
    default:
      return state;
  }
}
