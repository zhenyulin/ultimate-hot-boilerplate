import { createSelector } from 'reselect';

export const getSelectedId = state => state.getIn(['post', 'selected']);
export const getPopulatedPosts = state => state.getIn(['post', 'data']).toJS();

export const getSelectedPost = createSelector(
  [getPopulatedPosts, getSelectedId],
  (populatedPosts, selectedId) =>
    populatedPosts.find(post => post._id === selectedId),
);
