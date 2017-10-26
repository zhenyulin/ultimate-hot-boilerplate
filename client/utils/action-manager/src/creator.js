// @flow

import type {
  Name,
  AsyncActionNames,
  AsyncActions,
  ActionCreator,
  ActionBundle,
  AsyncActionBundle,
} from './types';

export const defaultAction = (ACTION_NAME: Name): ActionCreator => payload => ({
  type: ACTION_NAME,
  payload,
});

// TODO: add support for user namespace format settings
export const asyncActionNames = (name: Name): AsyncActionNames => ({
  GET: `${name}/GET`,
  POST: `${name}/POST`,
  RECEIVE: `${name}/RECEIVE`,
  NORMALIZE: `${name}/NORMALIZE`,
  ERROR: `${name}/ERROR`,
  RESET: `${name}/RESET`,
  SELECT: `${name}/SELECT`,
  CANCEL: `${name}/CANCEL`,
});

export const defaultAsyncActions = (
  ASYNC_ACTION_NAMES: AsyncActionNames,
): AsyncActions => ({
  get: defaultAction(ASYNC_ACTION_NAMES.GET),
  post: defaultAction(ASYNC_ACTION_NAMES.POST),
  receive: defaultAction(ASYNC_ACTION_NAMES.RECEIVE),
  normalize: defaultAction(ASYNC_ACTION_NAMES.NORMALIZE),
  error: defaultAction(ASYNC_ACTION_NAMES.ERROR),
  reset: defaultAction(ASYNC_ACTION_NAMES.RESET),
  select: defaultAction(ASYNC_ACTION_NAMES.SELECT),
  cancel: defaultAction(ASYNC_ACTION_NAMES.CANCEL),
});

export const actionBundle = (name: Name): ActionBundle => {
  const ACTION_NAME = name;
  const action = defaultAction(ACTION_NAME);
  return [ACTION_NAME, action];
};

export const asyncActionBundle = (name: Name): AsyncActionBundle => {
  const ACTION_NAMES = asyncActionNames(name);
  const defaultActions = defaultAsyncActions(ACTION_NAMES);
  return [ACTION_NAMES, defaultActions];
};
