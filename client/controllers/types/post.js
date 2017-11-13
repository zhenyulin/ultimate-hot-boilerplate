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
  meta: {
    status: string,
    isFetching: boolean,
    isError: boolean,
    error: {},
  },
  data: List<PopulatedPost>,
  entities: Map<string, any>,
  result: List<string>,
  selected: string,
};
