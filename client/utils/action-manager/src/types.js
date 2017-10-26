// @flow
import type { Map } from 'immutable';

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
  NORMALIZE: Name,
  ERROR: Name,
  RESET: Name,
  SELECT: Name,
  CANCEL: Name,
};

export type AsyncActions = {
  get: ActionCreator,
  post: ActionCreator,
  receive: ActionCreator,
  normalize: ActionCreator,
  error: ActionCreator,
  reset: ActionCreator,
  select: ActionCreator,
  cancel: ActionCreator,
};

export type AsyncActionBundle = [AsyncActionNames, AsyncActions];

export type ActionBundle = [Name, ActionCreator];

export type AsyncStatus = 'IDEL' | 'PROCESS' | 'SUCCESS' | 'ERROR';

// TODO: make the type stronger
export type InitialState = Map<string, any>;

/*
  Types for Manager Internal Functions
 */

export type ManagerAction = {
  type: Name,
  payload: AsyncActionNames | Name,
};
