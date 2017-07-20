/**
 * REQUIREMENT:
 * create the action-creator util as an open-source library
 * namespace collision check
 * use flow to do object type check
 */

// @flow
import { Set } from 'immutable';
import type { ManagerAction, AsyncActionNames } from './types';

export const ACTION_MANAGER = {
  REGISTER: '@ActionManager/register',
};

const initialState = Set();

const register = (
  state: Set<string>,
  actionName: AsyncActionNames | string,
): Set<String> => {
  const toBeRegistered = typeof actionName === 'string' ?
    Set(actionName) :
    Set(Object.values(actionName));
  const conflicts = state.intersect(toBeRegistered).length;
  if (conflicts) {
    return console.log('action namespace conflicts:', actionName);
  }
  return state.union(toBeRegistered);
};

export default function reducer(
  state: Set<string> = initialState,
  action: ManagerAction,
): Set<string> {
  switch (action.type) {
    case ACTION_MANAGER.REGISTER:
      return register(state, action.payload);
    default:
      return state;
  }
}

// TODO?: the middleware actually creates and manage default reducers for all async actions

// TODO?: further define get(query) post(data) type
// TODO: actionManagerMiddleware({prefix, delimiter})
// a middleware creator that creates a `actions` namespace in the store
// it allows users to customise format of action namespace
// it takes names from register functions and check if it conflicts with the namespace
// export const actionManagerMiddleware =
// ({ prefix: string, delimiter: string }) =>
// store =>
// next =>
// (action) => {
//   next(action);
//   // TODO: parse and validate the actionNameSpace format
// };

// TODO: registerAsyncAction()
// it register the action name in the namespace and receive confirmation
// and returns the default asyncAction names

// TODO: registerAction()
// it register the action name in the namespace and receive confirmation
