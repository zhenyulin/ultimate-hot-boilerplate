// @flow

import { fromJS } from 'immutable';
import { ASYNC } from './constant';
import type {
  Action,
  DefaultAsyncActionNames,
  State,
  HandlerMap,
} from './types';

const initialState = fromJS({
  meta: {
    status: ASYNC.IDLE,
    processing: false,
    faulty: false,
    error: {},
  },
  data: [],
  entities: {},
  result: [],
  selected: null,
});

export const defaultImmutableHandlerMap = (
  ASYNC_ACTION_NAMES: DefaultAsyncActionNames,
) => ({
  [ASYNC_ACTION_NAMES.GET]: state =>
    state.mergeDeep({
      meta: {
        status: ASYNC.PROCESS,
        processing: true,
        faulty: false,
      },
    }),
  [ASYNC_ACTION_NAMES.GOT]: (state, action) =>
    state.mergeDeep({
      meta: {
        status: ASYNC.SUCCESS,
        processing: false,
        faulty: false,
      },
      data: action.payload,
    }),
  [ASYNC_ACTION_NAMES.CREATE]: (state, { payload }) =>
    state
      .mergeDeep({
        meta: {
          status: ASYNC.PROCESS,
          processing: true,
          faulty: false,
        },
        entities: { [payload._id]: payload },
      })
      .update('result', result => result.push(payload._id)),
  [ASYNC_ACTION_NAMES.CREATED]: (state, { payload }) =>
    state
      .mergeDeep({
        meta: {
          status: ASYNC.SUCCESS,
          processing: false,
          faulty: false,
        },
        entities: payload,
      })
      .update('result', result => {
        const newKeys = Object.keys(payload).filter(
          key => !result.includes(key),
        );
        return result.concat(newKeys);
      }),
  [ASYNC_ACTION_NAMES.UPDATE]: (state, { payload }) =>
    state
      .mergeDeep({
        meta: {
          status: ASYNC.PROCESS,
          processing: true,
          faulty: false,
        },
      })
      .update('entities', entities => entities.merge(payload)),
  [ASYNC_ACTION_NAMES.UPDATED]: (state, { payload }) =>
    state
      .mergeDeep({
        meta: {
          status: ASYNC.SUCCESS,
          processing: false,
          faulty: false,
        },
      })
      .update('entities', entities => entities.merge(payload)),
  [ASYNC_ACTION_NAMES.DELETE]: (state, { payload }) =>
    state
      .mergeDeep({
        meta: {
          status: ASYNC.PROCESS,
          processing: true,
          faulty: false,
        },
      })
      .deleteIn(['entities', payload])
      .update(result => result.filter(id => id !== payload)),
  [ASYNC_ACTION_NAMES.DELETED]: state =>
    state.mergeDeep({
      meta: {
        status: ASYNC.SUCCESS,
        processing: false,
        faulty: false,
      },
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
        processing: false,
        faulty: true,
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
  ASYNC_ACTION_NAMES: DefaultAsyncActionNames,
) => createReducers(defaultImmutableHandlerMap(ASYNC_ACTION_NAMES));

// *TODO: adding normal javascript state store support
