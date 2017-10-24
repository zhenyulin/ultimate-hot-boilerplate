// @flow
export type Name = string;

export type Action = {
  type: Name,
  payload?: mixed,
};

export type ActionCreator = (payload?: mixed) => Action;

export type AsyncActionNames = {
  GET: Name,
  POST: Name,
  RECEIVE: Name,
  ERROR: Name,
  RESET: Name,
  SELECT: Name,
};

export type AsyncActions = {
  get: ActionCreator,
  post: ActionCreator,
  receive: ActionCreator,
  error: ActionCreator,
  reset: ActionCreator,
  select: ActionCreator,
};

export type AsyncActionBundle = [AsyncActionNames, AsyncActions];

export type ActionBundle = [Name, ActionCreator];

export type AsyncStatus = 'IDEL' | 'PROCESS' | 'SUCCESS' | 'ERROR';

/*
  Types for Manager Internal Functions
 */

export type ManagerAction = {
  type: Name,
  payload: AsyncActionNames | Name,
};
