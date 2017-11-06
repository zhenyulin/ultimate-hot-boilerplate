// @flow
import type { Map, List } from 'immutable';

export type Author = {
  _id: string,
  name: string,
  email: string,
};

export type Comment = {
  _id: string,
  content: string,
  author: string,
};

export type Post = {
  _id: string,
  title: string,
  comments: [string],
};

export type PopulatedComment = {
  _id: string,
  content: string,
  author: Author,
};

export type PopulatedPost = {
  _id: string,
  title: string,
  body: string,
  comments: [PopulatedComment],
};

export type PostState = {
  status: string,
  isFetching: boolean,
  isError: boolean,
  data: List<PopulatedPost>,
  normalized: {
    entities: Map<string, any>,
    results: List<string>,
  },
  error: {},
  selected: string,
};
