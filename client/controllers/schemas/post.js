import { schema } from 'normalizr';

const author = new schema.Entity('authors', {}, { idAttribute: '_id' });

const comment = new schema.Entity(
  'comments',
  {
    author,
  },
  { idAttribute: '_id' },
);

export const post = new schema.Entity(
  'posts',
  {
    comments: [comment],
  },
  { idAttribute: '_id' },
);

const postList = [post];

export default postList;
