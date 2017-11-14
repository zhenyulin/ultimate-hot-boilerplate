import { schema } from 'normalizr';

const Author = new schema.Entity('authors', {}, { idAttribute: '_id' });

const Comment = new schema.Entity(
  'comments',
  {
    author: Author,
  },
  { idAttribute: '_id' },
);

export const Post = new schema.Entity(
  'posts',
  {
    comments: [Comment],
  },
  { idAttribute: '_id' },
);

export const PostList = [Post];
