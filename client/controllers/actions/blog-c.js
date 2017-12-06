import {
  defaultAsyncActionBundle,
  defaultAsyncActionNames,
  createActionsFromNames,
} from 'utils/action-manager';

export const [POSTS, Posts] = defaultAsyncActionBundle('@BlogB/POSTS');

export const COMMENTS = {
  ...defaultAsyncActionNames('@BlogB/COMMENTS'),
  ADD: '@BlogB/COMMENTS/ADD',
  ADDED: '@BlogB/COMMENTS/ADDED',
  REMOVE: '@BlogB/COMMENTS/REMOVE',
  REMOVED: '@BlogB/COMMENTS/REMOVED',
};

export const Comments = createActionsFromNames(COMMENTS);

export const [AUTHORS, Authors] = defaultAsyncActionBundle('@BlogB/AUTHORS');
