// @flow

export type Post = {
  _id: string,
  title: string,
  comments: [string],
};

export type Author = {
  _id: string,
  name: string,
  email: string,
};

export type PopulatedComment = {
  _id: string,
  content: string,
  author: Author,
};

export type PopulatedPost = {
  title: string,
  body: string,
  comments: [PopulatedComment],
};
