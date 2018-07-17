// @flow

import { createSelector } from 'reselect';

import type { Map } from 'immutable';
import type {
  Post,
  Author,
  Comment,
  PopulatedPost,
} from 'controllers/types/blog';
import type { State } from 'utils/action-manager';

export const getPostData = (state: State): Map<string, PopulatedPost> =>
  state.getIn(['post', 'data']);
export const getSelectedId = (state: State): string =>
  state.getIn(['post', 'selected']);
export const getPosts = (state: State): Map<string, Post> =>
  state.getIn(['post', 'normalized', 'entities', 'posts']);
export const getComments = (state: State): Map<string, Comment> =>
  state.getIn(['post', 'normalized', 'entities', 'comments']);
export const getAuthors = (state: State): Map<string, Author> =>
  state.getIn(['post', 'normalized', 'entities', 'authors']);

export const getPopulatedPosts = createSelector(
  [getPosts, getComments, getAuthors],
  (
    posts: Map<string, Post>,
    comments: Map<string, Comment>,
    authors: Map<string, Author>,
  ) => {
    // TODO: null check
    const populatedComments = comments.map(comment => {
      comment.update('author', authorId => authors.get(authorId));
      return comment;
    });
    const populatedPosts = posts.map(post => {
      post.update('comments', postComments =>
        postComments.map(commentId => populatedComments.get(commentId)),
      );
      return post;
    });
    return populatedPosts;
  },
);

export const getPopulatedSelectedPost = createSelector(
  [getPostData, getSelectedId],
  (postData, selectedId) =>
    postData.find(post => post.get('_id') === selectedId),
);

export const getSelectedPost = createSelector(
  [getPosts, getSelectedId],
  (posts, selectedId) => posts.get(selectedId),
);
