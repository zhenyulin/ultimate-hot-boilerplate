// @flow

import { fromJS } from 'immutable';
import { ASYNC } from './constant';
import type { Action, AsyncActionNames, State, HandlerMap } from './types';

// TODO: deal with data structure type as an object indexed by id
// it needs to handle return situation where there's only one data entity
// it also needs to handle return situation where it is transformed from an array of entities
const initialState = fromJS({
  status: ASYNC.IDLE,
  isFetching: false,
  isError: false,
  data: [],
  normalized: {
    entities: {},
    results: [],
  },
  error: {},
  selected: null,
});

export const defaultImmutableHandlerMap = (
  ASYNC_ACTION_NAMES: AsyncActionNames,
) => ({
  [ASYNC_ACTION_NAMES.GET]: state =>
    state.merge({
      status: ASYNC.PROCESS,
      isFetching: true,
      isError: false,
    }),
  [ASYNC_ACTION_NAMES.POST]: state =>
    state.merge({
      status: ASYNC.PROCESS,
      isFetching: true,
      isError: false,
    }),
  [ASYNC_ACTION_NAMES.RECEIVE]: (state, action) =>
    state.merge({
      status: ASYNC.SUCCESS,
      isFetching: false,
      isError: false,
      data: action.payload,
    }),
  [ASYNC_ACTION_NAMES.NORMALIZE]: (state, action) =>
    state.merge({
      normalized: action.payload,
    }),
  [ASYNC_ACTION_NAMES.ERROR]: (state, action) =>
    state.merge({
      status: ASYNC.ERROR,
      isFetching: false,
      isError: true,
      error: action.payload,
    }),
  [ASYNC_ACTION_NAMES.RESET]: state => state.merge(initialState),
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
