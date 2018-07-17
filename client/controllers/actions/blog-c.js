import {
  defaultAsyncActionBundle,
  defaultAsyncActionNames,
  createActionsFromNames,
} from 'utils/action-manager';

export const [POSTS, Posts] = defaultAsyncActionBundle('@BlogC/POSTS');

export const COMMENTS = {
  ...defaultAsyncActionNames('@BlogC/COMMENTS'),
  ADD: '@BlogC/COMMENTS/ADD',
  ADDED: '@BlogC/COMMENTS/ADDED',
  REMOVE: '@BlogC/COMMENTS/REMOVE',
  REMOVED: '@BlogC/COMMENTS/REMOVED',
};

export const Comments = createActionsFromNames(COMMENTS);

export const [AUTHORS, Authors] = defaultAsyncActionBundle('@BlogC/AUTHORS');
