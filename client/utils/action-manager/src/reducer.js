// @flow

import { fromJS } from 'immutable';
import { ASYNC } from './constant';
import type { Action, AsyncActionNames } from './types';

const initialState = fromJS({
  status: ASYNC.IDLE,
  isFetching: false,
  isError: false,
  data: {},
  error: {},
});

export const immutableAsyncReducers = (
  ASYNC_ACTION_NAMES: AsyncActionNames,
) => (state: fromJS = initialState, action: Action) => {
  switch (action.type) {
    case ASYNC_ACTION_NAMES.GET:
    case ASYNC_ACTION_NAMES.POST:
      return state.merge({
        status: ASYNC.PROCESS,
        isFetching: true,
        isError: false,
      });
    case ASYNC_ACTION_NAMES.RECEIVE:
      return state.merge({
        status: ASYNC.SUCCESS,
        isFetching: false,
        isError: false,
        data: action.payload,
      });
    case ASYNC_ACTION_NAMES.ERROR:
      return state.merge({
        status: ASYNC.ERROR,
        isFetching: false,
        isError: true,
        error: action.payload,
      });
    case ASYNC_ACTION_NAMES.RESET:
      return state.merge(initialState);
    default:
      return state;
  }
};

// *TODO: adding normal javascript state store support

export default immutableAsyncReducers;
