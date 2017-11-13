// @flow

import { fromJS } from 'immutable';
import { ASYNC } from './constant';
import type { Action, AsyncActionNames, State, HandlerMap } from './types';

const initialState = fromJS({
  meta: {
    status: ASYNC.IDLE,
    isFetching: false,
    isError: false,
    error: {},
  },
  data: [],
  entities: {},
  result: [],
  selected: null,
});

export const defaultImmutableHandlerMap = (
  ASYNC_ACTION_NAMES: AsyncActionNames,
) => ({
  [ASYNC_ACTION_NAMES.GET]: state =>
    state.mergeDeep({
      meta: {
        status: ASYNC.PROCESS,
        isFetching: true,
        isError: false,
      },
    }),
  [ASYNC_ACTION_NAMES.POST]: state =>
    state.mergeDeep({
      meta: {
        status: ASYNC.PROCESS,
        isFetching: true,
        isError: false,
      },
    }),
  [ASYNC_ACTION_NAMES.RECEIVE]: (state, action) =>
    state.mergeDeep({
      meta: {
        status: ASYNC.SUCCESS,
        isFetching: false,
        isError: false,
      },
      data: action.payload,
    }),
  [ASYNC_ACTION_NAMES.NORMALIZE]: (state, action) =>
    state.merge({
      entities: action.payload.entities,
      result: action.payload.result,
    }),
  [ASYNC_ACTION_NAMES.ERROR]: (state, action) =>
    state.mergeDeep({
      meta: {
        status: ASYNC.ERROR,
        isFetching: false,
        isError: true,
        error: action.payload,
      },
    }),
  [ASYNC_ACTION_NAMES.RESET]: state => state.mergeDeep(initialState),
  [ASYNC_ACTION_NAMES.SELECT]: (state, action) =>
    state.merge({
      selected: action.payload,
    }),
});

export const createReducers = (handlerMap: HandlerMap) => (
  state: State = initialState,
  action: Action,
) => {
  const handler = handlerMap[action.type];
  return handler ? handler(state, action) : state;
};

export const defaultImmutableAsyncReducers = (
  ASYNC_ACTION_NAMES: AsyncActionNames,
) => createReducers(defaultImmutableHandlerMap(ASYNC_ACTION_NAMES));

// *TODO: adding normal javascript state store support
