// @flow

import type {
  Name,
  DefaultAsyncActionNames,
  DefaultAsyncActions,
  ActionCreator,
  ActionBundle,
  AsyncActionBundle,
  ActionNames,
  Actions,
} from './types';

export const defaultAction = (ACTION_NAME: Name): ActionCreator => (
  payload,
  meta,
) => ({
  type: ACTION_NAME,
  payload,
  meta,
});

export const createActionsFromNames = (
  ACTION_NAMES_COLLECTION: ActionNames,
): Actions =>
  Object.keys(ACTION_NAMES_COLLECTION).reduce(
    (actions, key) => ({
      ...actions,
      [key.toLowerCase()]: defaultAction(ACTION_NAMES_COLLECTION[key]),
    }),
    {},
  );

export const defaultAsyncActionNames = (
  name: Name,
): DefaultAsyncActionNames => ({
  GET: `${name}/GET`,
  GOT: `${name}/GOT`,
  CREATE: `${name}/CREATE`,
  CREATED: `${name}/CREATED`,
  UPDATE: `${name}/UPDATE`,
  UPDATED: `${name}/UPDATED`,
  DELETE: `${name}/DELETE`,
  DELETED: `${name}/DELETED`,
  NORMALIZE: `${name}/NORMALIZE`,
  ERROR: `${name}/ERROR`,
  RESET: `${name}/RESET`,
  SELECT: `${name}/SELECT`,
  CANCEL: `${name}/CANCEL`,
});

export const defaultAsyncActions = (
  ASYNC_ACTION_NAMES: DefaultAsyncActionNames,
): DefaultAsyncActions => createActionsFromNames(ASYNC_ACTION_NAMES);

export const defaultActionBundle = (name: Name): ActionBundle => {
  const ACTION_NAME = name;
  const action = defaultAction(ACTION_NAME);
  return [ACTION_NAME, action];
};

export const defaultAsyncActionBundle = (name: Name): AsyncActionBundle => {
  const ACTION_NAMES = defaultAsyncActionNames(name);
  const defaultActions = defaultAsyncActions(ACTION_NAMES);
  return [ACTION_NAMES, defaultActions];
};
