import {
  defaultAsyncActionBundle,
  defaultAsyncActionNames,
  createActionsFromNames,
} from 'utils/action-manager';

export const [POSTS, Posts] = defaultAsyncActionBundle('@POSTS');

export const COMMENTS = {
  ...defaultAsyncActionNames('@COMMENTS'),
  ADD: '@COMMENTS/ADD',
  ADDED: '@COMMENTS/ADDED',
  REMOVE: '@COMMENTS/REMOVE',
  REMOVED: '@COMMENTS/REMOVED',
};

export const Comments = createActionsFromNames(COMMENTS);

export const [AUTHORS, Authors] = defaultAsyncActionBundle('@AUTHORS');
