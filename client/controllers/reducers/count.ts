import { Map } from 'immutable';

import { ADD } from 'controllers/actions/count';
import { Action } from 'controllers/types/action';

const initialState: Map<string, any> = Map({
  current: 0
});

export function addCount(state: Map<string, any>): Map<string, any> {
  return state.update('current', value => value + 1);
}

export default function reducer(state: Map<string, any> = initialState, action: Action<any>) {
  switch (action.type) {
    case ADD:
      return addCount(state);
    default:
      return state;
  }
}
