import { request } from 'graphql-request';
import { createLogic } from 'redux-logic';
import { normalize } from 'normalizr';

import {
  POSTS,
  Posts,
  COMMENTS,
  Comments,
  Authors,
} from 'controllers/actions/blog';

import { PopulatedPostList, PopulatedPost } from 'controllers/schemas/blog';

const getPostsLogic = createLogic({
  type: POSTS.GET,
  process(deps, dispatch, done) {
    const query = `{
      posts {
        _id,
        title,
        body,
        comments {
          _id,
          author {
            _id,
            name,
            email,
          }
          content,
        },
      }
    }`;
    request('/graphql/', query)
      .then(response => response.posts)
      .then(data => {
        dispatch(Posts.got(data));
        const normalized = normalize(data, PopulatedPostList);
        dispatch(
          Posts.normalize({
            result: normalized.result || [],
            entities: normalized.entities.posts || {},
          }),
        );
        dispatch(
          Comments.normalize({
            result: Object.keys(normalized.entities.comments || {}),
            entities: normalized.entities.comments || {},
          }),
        );
        dispatch(
          Authors.normalize({
            result: Object.keys(normalized.entities.authors || {}),
            entities: normalized.entities.authors || {},
          }),
        );
        dispatch(Posts.select(data[0]._id));
      })
      .catch(err => dispatch(Posts.error(err)))
      .then(() => done());
  },
});

const addCommentLogic = createLogic({
  type: COMMENTS.ADD,
  process({ action }, dispatch, done) {
    const { post, content, authorName, authorEmail } = action.payload;

    // Optimistic UI
    const commentId = 'fakeCommentId';
    const authorId = 'fakeAuthorId';
    const comment = {
      _id: commentId,
      content,
      author: authorId,
    };
    const author = {
      _id: authorId,
      name: authorName,
      email: authorEmail,
    };
    const updatePost = {
      ...post,
      comments: [...post.comments, commentId],
    };
    dispatch(Comments.create(comment));
    dispatch(Authors.create(author));
    dispatch(Posts.update({ [post._id]: updatePost }));

    // GraphQL Request
    const query = `mutation {
      addComment(
        _id: "${updatePost._id}",
        input: {
          content: "${comment.content}",
          author: {
            name: "${author.name}",
            email: "${author.email}",
          }
        }
      ) {
        _id,
        title,
        body,
        comments {
          _id
          content,
          author {
            _id,
            name,
            email,
          }
        }
      }
    }`;
    // TODO: error handling when optimistic fails
    // TODO: cleanup fakeId and related objects
    request('/graphql/', query)
      .then(({ addComment }) => dispatch(Comments.added(addComment)))
      .then(() => done());
  },
});

const addedCommentLogic = createLogic({
  type: COMMENTS.ADDED,
  process({ action }, dispatch, done) {
    const update = action.payload;
    const normalized = normalize(update, PopulatedPost);
    const { entities } = normalized;
    const { authors, comments, posts } = entities;
    dispatch(Authors.created(authors));
    dispatch(Comments.created(comments));
    dispatch(Posts.updated(posts));
    done();
  },
});

const deleteCommentLogic = createLogic({
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
    const query = `mutation {
      deleteComment(_id: "${commentId}") {
        _id
      }
    }`;
    // TODO: error handling when optimistic fails
    request('/graphql/', query)
      .then(({ deleteComment }) => dispatch(Comments.deleted(deleteComment)))
      .then(() => done());
  },
});

export default [
  getPostsLogic,
  addCommentLogic,
  addedCommentLogic,
  deleteCommentLogic,
];
