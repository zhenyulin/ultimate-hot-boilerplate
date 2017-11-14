// @flow

import type {
  Name,
  AsyncActionNames,
  AsyncActions,
  ActionCreator,
  ActionBundle,
  AsyncActionBundle,
  ActionNamesCollection,
  ActionsCollection,
} from './types';

export const defaultAction = (ACTION_NAME: Name): ActionCreator => (
  payload,
  effect,
) => ({
  type: ACTION_NAME,
  payload,
  effect,
});

export const asyncActionNames = (name: Name): AsyncActionNames => ({
  GET: `${name}/GET`,
  RECEIVE: `${name}/RECEIVE`,
  CREATE: `${name}/CREATE`,
  CREATED: `${name}/CREATED`,
  UPDATE: `${name}/UPDATE`,
  UPDATED: `${name}/UPDATED`,
  REMOVE: `${name}/REMOVE`,
  REMOVED: `${name}/REMOVED`,
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
  receive: defaultAction(ASYNC_ACTION_NAMES.RECEIVE),
  create: defaultAction(ASYNC_ACTION_NAMES.CREATE),
  created: defaultAction(ASYNC_ACTION_NAMES.CREATED),
  update: defaultAction(ASYNC_ACTION_NAMES.UPDATE),
  updated: defaultAction(ASYNC_ACTION_NAMES.UPDATED),
  remove: defaultAction(ASYNC_ACTION_NAMES.REMOVE),
  removed: defaultAction(ASYNC_ACTION_NAMES.REMOVED),
  normalize: defaultAction(ASYNC_ACTION_NAMES.NORMALIZE),
  error: defaultAction(ASYNC_ACTION_NAMES.ERROR),
  reset: defaultAction(ASYNC_ACTION_NAMES.RESET),
  select: defaultAction(ASYNC_ACTION_NAMES.SELECT),
  cancel: defaultAction(ASYNC_ACTION_NAMES.CANCEL),
});

export const createActionsFromNames = (
  ACTION_NAMES_COLLECTION: ActionNamesCollection,
): ActionsCollection =>
  Object.keys(ACTION_NAMES_COLLECTION).reduce(
    (actions, key) => ({
      ...actions,
      [key.toLowerCase()]: defaultAction(ACTION_NAMES_COLLECTION[key]),
    }),
    {},
  );

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
