import fetch from 'isomorphic-fetch';
import DataLoader from 'dataloader';
import { createLogic } from 'redux-logic';
import { normalize } from 'normalizr';

import {
  POSTS,
  Posts,
  COMMENTS,
  Comments,
  AUTHORS,
  Authors,
} from 'controllers/actions/blog';

import { Post, Comment, Author } from 'controllers/schemas/blog';

const commentLoader = new DataLoader(ids => {
  const requests = ids.map(id =>
    fetch(`/rest/comments/${id}`).then(res => res.json()),
  );
  return Promise.all(requests);
});

const authorLoader = new DataLoader(ids => {
  const requests = ids.map(id =>
    fetch(`/rest/authors/${id}`).then(res => res.json()),
  );
  return Promise.all(requests);
});

const postLogics = {
  get: createLogic({
    type: POSTS.GET,
    cancelType: POSTS.CANCEL,
    latest: true,
    process(deps, dispatch, done) {
      fetch('/rest/posts')
        .then(res => res.json())
        .then(data => {
          dispatch(Posts.got(data));
          const normalized = normalize(data, [Post]);
          dispatch(
            Posts.normalize({
              result: normalized.result || [],
              entities: normalized.entities.posts || {},
            }),
          );
          dispatch(Posts.select(data[0]._id));
        })
        .catch(err => dispatch(Posts.error(err)))
        .then(() => done());
    },
  }),
  got: createLogic({
    type: POSTS.GOT,
    process({ action }, dispatch, done) {
      const posts = action.payload;
      const ids = posts.reduce(
        (extracted, post) => [...extracted, ...post.comments],
        [],
      );
      dispatch(Comments.get({ ids }));
      done();
    },
  }),
  update: createLogic({
    type: POSTS.UPDATE,
    process({ action }, dispatch, done) {
      if (action.meta && action.meta.optimistic) {
        done();
        return;
      }
      // TODO: enahnce this code
      const id = Object.keys(action.payload)[0];
      const update = action.payload[id];
      // Remote Request
      fetch(`/rest/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
      })
        .then(res => res.json())
        .then(post => {
          dispatch(Posts.updated({ [post._id]: post }));
        })
        .catch(err => dispatch(Comments.error(err)))
        .then(() => done());
    },
  }),
};

const commentLogics = {
  get: createLogic({
    type: COMMENTS.GET,
    cancelType: COMMENTS.CANCEL,
    process({ action }, dispatch, done) {
      const { ids } = action.payload;
      commentLoader
        .loadMany(ids)
        .then(data => {
          dispatch(Comments.got(data));
          const normalized = normalize(data, [Comment]);
          dispatch(
            Comments.normalize({
              result: normalized.result || [],
              entities: normalized.entities.comments || {},
            }),
          );
        })
        .catch(err => dispatch(Comments.error(err)))
        .then(() => done());
    },
  }),
  got: createLogic({
    type: COMMENTS.GOT,
    process({ action }, dispatch, done) {
      const comments = action.payload;
      const ids = comments.reduce(
        (extracted, comment) => [...extracted, comment.author],
        [],
      );
      dispatch(Authors.get({ ids }));
      done();
    },
  }),
  add: createLogic({
    type: COMMENTS.ADD,
    process({ action }, dispatch, done) {
      const { post, content, authorName, authorEmail } = action.payload;

      // Optimistic UI
      const fakeCommentId = 'fakeCommentId';
      const fakeAuthorId = 'fakeAuthorId';
      const fakeComment = {
        _id: fakeCommentId,
        content,
        author: fakeAuthorId,
      };
      const fakeAuthor = {
        _id: fakeAuthorId,
        name: authorName,
        email: authorEmail,
      };
      const fakePostUpdate = {
        ...post,
        comments: [...post.comments, fakeCommentId],
      };
      dispatch(Comments.create(fakeComment, { optimistic: true }));
      dispatch(Authors.create(fakeAuthor, { optimistic: true }));
      dispatch(
        Posts.update({ [post._id]: fakePostUpdate }, { optimistic: true }),
      );

      // Remote Request
      fetch('/rest/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          author: {
            name: authorName,
            email: authorEmail,
          },
        }),
      })
        .then(res => res.json())
        .then(async comment => {
          const { _id } = comment;
          dispatch(Comments.created({ [_id]: comment }));
          const author = await authorLoader.load(comment.author);
          dispatch(Authors.created({ [author._id]: author }));
          const postUpdate = { ...post, comments: [...post.comments, _id] };
          dispatch(Posts.update({ [post._id]: postUpdate }));
        })
        .catch(err => dispatch(Comments.error(err)))
        .then(() => done());
    },
  }),
  remove: createLogic({
    type: COMMENTS.REMOVE,
    process({ getState, action }, dispatch, done) {
      const commentId = action.payload;
      const selectedPostId = getState().getIn(['blog', 'posts', 'selected']);
      const selectedPost = getState().getIn([
        'blog',
        'posts',
        'entities',
        selectedPostId,
      ]);
      const updatedSelectedPost = selectedPost.update('comments', comments =>
        comments.filter(id => id !== commentId),
      );
      dispatch(Comments.delete(commentId));
      dispatch(
        Posts.update({
          [selectedPostId]: updatedSelectedPost,
        }),
      );

      fetch(`/rest/comments/${commentId}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(deletedComment => dispatch(Comments.deleted(deletedComment)))
        .then(() => done());
    },
  }),
};

const authorLogics = {
  get: createLogic({
    type: AUTHORS.GET,
    cancelType: AUTHORS.CANCEL,
    process({ action }, dispatch, done) {
      const { ids } = action.payload;
      authorLoader
        .loadMany(ids)
        .then(data => {
          dispatch(Authors.got(data));
          const normalized = normalize(data, [Author]);
          dispatch(
            Authors.normalize({
              result: normalized.result || [],
              entities: normalized.entities.authors || {},
            }),
          );
        })
        .catch(err => dispatch(Authors.error(err)))
        .then(() => done());
    },
  }),
};

const arrayOf = logicObject =>
  Object.keys(logicObject).map(key => logicObject[key]);

export default [
  ...arrayOf(postLogics),
  ...arrayOf(commentLogics),
  ...arrayOf(authorLogics),
];
