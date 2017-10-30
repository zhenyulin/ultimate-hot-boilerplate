import { createSelector } from 'reselect';

export const getSelectedId = state => state.getIn(['post', 'selected']);
export const getPosts = state =>
  state.getIn(['post', 'normalized', 'entities', 'posts']);
export const getComments = state =>
  state.getIn(['post', 'normalized', 'entities', 'posts']);
export const getAuthors = state =>
  state.getIn(['post', 'normalized', 'entities', 'authors']);
export const getPostData = state => state.getIn(['post', 'data']);

export const getSelectedPost = createSelector(
  [getPostData, getSelectedId],
  (postData, selectedId) =>
    postData.find(post => post.get('_id') === selectedId),
);
