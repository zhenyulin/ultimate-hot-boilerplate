// @flow

import { createSelector } from 'reselect';

import type { Map } from 'immutable';
import type {
  Post,
  Author,
  Comment,
  PopulatedPost,
} from 'controllers/types/post';

export const getSelectedId = (state: Map<string, any>): string =>
  state.getIn(['post', 'selected']);
export const getPosts = (state: Map<string, any>): Map<string, Post> =>
  state.getIn(['post', 'normalized', 'entities', 'posts']);
export const getComments = (state: Map<string, any>): Map<string, Comment> =>
  state.getIn(['post', 'normalized', 'entities', 'posts']);
export const getAuthors = (state: Map<string, any>): Map<string, Author> =>
  state.getIn(['post', 'normalized', 'entities', 'authors']);
export const getPostData = (
  state: Map<string, any>,
): Map<string, PopulatedPost> => state.getIn(['post', 'data']);

export const getSelectedPost = createSelector(
  [getPostData, getSelectedId],
  (postData, selectedId) =>
    postData.find(post => post.get('_id') === selectedId),
);
