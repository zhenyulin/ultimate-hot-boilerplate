import { createSelector } from 'reselect';

const getPosts = state =>
  state.event.getIn(['post', 'data', 'entities', 'posts']);
const getComments = state =>
  state.event.getIn(['post', 'data', 'entities', 'comments']);
const getAuthors = state =>
  state.event.getIn(['post', 'data', 'entities', 'authors']);

export const getPopulatedComments = createSelector(
  [getComments, getAuthors],
  (comments, authors) => {
    const populatedComments = comments.map(comment => authors[comment.author]);
    return populatedComments;
  },
);

export const getPopulatedPosts = createSelector(
  [getPosts, getPopulatedComments],
  (posts, populatedComments) => {
    const populatedPosts = posts.map(post =>
      post.comments.map(id => populatedComments[id]),
    );
    return populatedPosts;
  },
);
