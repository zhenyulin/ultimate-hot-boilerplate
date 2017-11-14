// @flow
import type { Map } from 'immutable';

export type Name = string;

export type Action = {
  type: Name,
  payload?: mixed,
  effect?: mixed,
};

export type ActionCreator = (payload?: mixed, effect?: mixed) => Action;

export type AsyncActionNames = {
  GET: Name,
  RECEIVE: Name,
  CREATE: Name,
  CREATED: Name,
  UPDATE: Name,
  UPDATED: Name,
  REMOVE: Name,
  REMOVED: Name,
  NORMALIZE: Name,
  ERROR: Name,
  RESET: Name,
  SELECT: Name,
  CANCEL: Name,
};

export type ActionNamesCollection = {
  [string]: Name,
};

export type AsyncActions = {
  get: ActionCreator,
  receive: ActionCreator,
  create: ActionCreator,
  created: ActionCreator,
  update: ActionCreator,
  updated: ActionCreator,
  remove: ActionCreator,
  removed: ActionCreator,
  normalize: ActionCreator,
  error: ActionCreator,
  reset: ActionCreator,
  select: ActionCreator,
  cancel: ActionCreator,
};

export type ActionsCollection = {
  [string]: ActionCreator,
};

export type AsyncActionBundle = [AsyncActionNames, AsyncActions];

export type ActionBundle = [Name, ActionCreator];

export type AsyncStatus = 'IDEL' | 'PROCESS' | 'SUCCESS' | 'ERROR';

// TODO: make the type stronger
export type State = Map<string, any>;

export type ActionHandler = (state: State, action?: Action) => State;

export type HandlerMap = {
  [Name]: ActionHandler,
};

/*
  Types for Manager Internal Functions
 */

export type ManagerAction = {
  type: Name,
  payload: AsyncActionNames | Name,
};
