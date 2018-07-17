import {
  defaultAsyncActionBundle,
  defaultAsyncActionNames,
  createActionsFromNames,
} from 'utils/action-manager';

export const [POSTS, Posts] = defaultAsyncActionBundle('@BlogD/POSTS');

export const COMMENTS = {
  ...defaultAsyncActionNames('@BlogD/COMMENTS'),
  ADD: '@BlogD/COMMENTS/ADD',
  ADDED: '@BlogD/COMMENTS/ADDED',
  REMOVE: '@BlogD/COMMENTS/REMOVE',
  REMOVED: '@BlogD/COMMENTS/REMOVED',
};

export const Comments = createActionsFromNames(COMMENTS);

export const [AUTHORS, Authors] = defaultAsyncActionBundle('@BlogD/AUTHORS');
