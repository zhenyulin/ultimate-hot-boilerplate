import {
  defaultAsyncActionBundle,
  defaultAsyncActionNames,
  createActionsFromNames,
} from 'utils/action-manager';

export const [POSTS, Posts] = defaultAsyncActionBundle('@BlogA/POSTS');

export const COMMENTS = {
  ...defaultAsyncActionNames('@BlogA/COMMENTS'),
  ADD: '@BlogA/COMMENTS/ADD',
  ADDED: '@BlogA/COMMENTS/ADDED',
  REMOVE: '@BlogA/COMMENTS/REMOVE',
  REMOVED: '@BlogA/COMMENTS/REMOVED',
};

export const Comments = createActionsFromNames(COMMENTS);

export const [AUTHORS, Authors] = defaultAsyncActionBundle('@BlogA/AUTHORS');
