import { request } from 'graphql-request';
import { createLogic } from 'redux-logic';
import { normalize } from 'normalizr';

import {
  POST,
  postActions,
  COMMENT,
  commentActions,
  authorActions,
} from 'controllers/actions/post';

import { PostList, Post } from 'controllers/schemas/post';

const getPostListLogic = createLogic({
  type: POST.GET,
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
        dispatch(postActions.receive(data));
        // TODO: integrate normalize function into the action-manager reducer?
        const normalized = normalize(data, PostList);
        dispatch(
          postActions.normalize({
            result: normalized.result || [],
            entities: normalized.entities.posts || {},
          }),
        );
        dispatch(
          commentActions.normalize({
            result: Object.keys(normalized.entities.comments || {}),
            entities: normalized.entities.comments || {},
          }),
        );
        dispatch(
          authorActions.normalize({
            result: Object.keys(normalized.entities.authors || {}),
            entities: normalized.entities.authors || {},
          }),
        );
        dispatch(postActions.select(data[0]._id));
      })
      .catch(err => dispatch(postActions.error(err)))
      .then(() => done());
  },
});

const addCommentLogic = createLogic({
  type: COMMENT.ADD,
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
    dispatch(commentActions.create(comment));
    dispatch(authorActions.create(author));
    dispatch(postActions.update({ [post._id]: updatePost }));

    // Http Request
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
      .then(({ addComment }) => dispatch(commentActions.added(addComment)))
      .then(() => done());
  },
});

const addedCommentLogic = createLogic({
  type: COMMENT.ADDED,
  process({ action }, dispatch, done) {
    const update = action.payload;
    const normalized = normalize(update, Post);
    const { entities } = normalized;
    const { authors, comments, posts } = entities;
    dispatch(authorActions.created(authors));
    dispatch(commentActions.created(comments));
    dispatch(postActions.updated(posts));
    done();
  },
});

const deleteCommentLogic = createLogic({
  type: COMMENT.DELETE,
  process({ getState, action }, dispatch, done) {
    const commentId = action.payload;
    const selectedPostId = getState().getIn(['post', 'selected']);
    const selectedPost = getState().getIn(['post', 'entities', selectedPostId]);
    const updatedSelectedPost = selectedPost.update('comments', comments =>
      comments.filter(id => id !== commentId),
    );
    dispatch(commentActions.remove(commentId));
    dispatch(
      postActions.update({
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
      .then(({ deleteComment }) =>
        dispatch(commentActions.deleted(deleteComment)),
      )
      .then(() => done());
  },
});

export default [
  getPostListLogic,
  addCommentLogic,
  addedCommentLogic,
  deleteCommentLogic,
];
