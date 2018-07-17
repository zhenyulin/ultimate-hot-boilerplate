// @flow
import type { Map } from 'immutable';

export type Name = string;

export type Action = {
  type: Name,
  payload?: mixed,
};

export type ActionCreator = (payload?: mixed) => Action;

export type ActionNames = {
  [string]: Name,
};

export type Actions = {
  [string]: ActionCreator,
};

export type DefaultAsyncActionNames = {
  GET: Name,
  GOT: Name,
  CREATE: Name,
  CREATED: Name,
  UPDATE: Name,
  UPDATED: Name,
  DELETE: Name,
  DELETED: Name,
  NORMALIZE: Name,
  ERROR: Name,
  RESET: Name,
  SELECT: Name,
  CANCEL: Name,
};

export type DefaultAsyncActions = {
  get: ActionCreator,
  got: ActionCreator,
  create: ActionCreator,
  created: ActionCreator,
  update: ActionCreator,
  updated: ActionCreator,
  delete: ActionCreator,
  deleted: ActionCreator,
  normalize: ActionCreator,
  error: ActionCreator,
  reset: ActionCreator,
  select: ActionCreator,
  cancel: ActionCreator,
};

export type AsyncActionBundle = [DefaultAsyncActionNames, DefaultAsyncActions];

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
  payload: ActionNames | Name,
};
