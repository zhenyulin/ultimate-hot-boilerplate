import {
  asyncActionBundle,
  asyncActionNames,
  createActionsFromNames,
} from 'utils/action-manager';

export const [POST, postActions] = asyncActionBundle('@POST/DATA');

export const COMMENT = {
  ...asyncActionNames('@COMMENT/DATA'),
  ADD: '@COMMENT/ADD',
  ADDED: '@COMMENT/ADDED',
  DELETE: '@COMMENT/DELETE',
  DELETED: '@COMMENT/DELETED',
};

export const commentActions = createActionsFromNames(COMMENT);

export const [AUTHOR, authorActions] = asyncActionBundle('@AUTHOR/DATA');
