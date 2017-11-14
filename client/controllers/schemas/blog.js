import { schema } from 'normalizr';

export const Author = new schema.Entity('authors', {}, { idAttribute: '_id' });
export const Comment = new schema.Entity(
  'comments',
  {},
  { idAttribute: '_id' },
);
export const Post = new schema.Entity('posts', {}, { idAttribute: '_id' });

export const PopulatedComment = new schema.Entity(
  'comments',
  {
    author: Author,
  },
  { idAttribute: '_id' },
);

export const PopulatedPost = new schema.Entity(
  'posts',
  {
    comments: [PopulatedComment],
  },
  { idAttribute: '_id' },
);

export const PopulatedPostList = [PopulatedPost];
