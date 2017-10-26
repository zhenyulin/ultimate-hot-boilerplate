import { createSelector } from 'reselect';

export const getSelectedId = state => state.event.getIn(['post', 'selected']);
export const getPopulatedPosts = state =>
  state.event.getIn(['post', 'data']).toJS();

export const getSelectedPost = createSelector(
  [getPopulatedPosts, getSelectedId],
  (populatedPosts, selectedId) =>
    populatedPosts.find(post => post._id === selectedId),
);
