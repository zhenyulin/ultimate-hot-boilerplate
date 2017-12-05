// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Form, Text, TextArea } from 'react-form';

import CommonPage from 'components/templates/common-page';
import SideNav from 'components/widgets/side-nav';
import { Posts } from 'controllers/actions/blog-b';
import type { PopulatedPost } from 'controllers/types/blog';

import immutableToJS from 'utils/components/immutable-to-js';

import { pages } from 'router';

type Props = {
  className: string,
  posts: [PopulatedPost],
  selectedPostId: string,
  select: (id: string) => void,
  addComment: ({
    postId: string,
    content: string,
    authorName: string,
    authorEmail: string,
  }) => void,
  deleteComment: ({ commentId: string }) => void,
};

export class Page extends React.PureComponent<Props> {
  static defaultProps = {
    selectedPostId: '',
    posts: [],
  };

  render() {
    const { className, selectedPostId, posts } = this.props;
    const { select, addComment, deleteComment } = this.props;
    const selectedPost = posts.find(post => post._id === selectedPostId) || {
      title: '',
      body: '',
      comments: [],
    };
    return (
      <CommonPage className={className} pages={pages}>
        <div className="note">built with Apollo and GraphQL</div>
        <div className="contentView">
          <SideNav
            className="titles"
            list={posts.map(post => ({
              id: post._id,
              value: post.title,
            }))}
            func={select}
          />
          <div className="postContent">
            <div className="title">{selectedPost.title}</div>
            <div className="body">{selectedPost.body}</div>
          </div>
          <div className="comments">
            {selectedPost.comments.length ? (
              <div className="title">Comments</div>
            ) : null}
            <div className="body">
              {selectedPost.comments.map(({ _id, content, author }) => (
                <div key={_id} className="comment">
                  <button
                    className="delete"
                    onClick={() => deleteComment({ commentId: _id })}
                  >
                    X
                  </button>
                  <div className="author">{author.name}:</div>
                  <div className="content">{content}</div>
                </div>
              ))}
              {selectedPostId ? (
                <div className="comment">
                  <Form
                    onSubmit={({ content, authorName, authorEmail }) =>
                      addComment({
                        postId: selectedPostId,
                        content,
                        authorName,
                        authorEmail,
                      })
                    }
                  >
                    {formApi => (
                      <form onSubmit={formApi.submitForm}>
                        <label htmlFor="email">
                          Email<Text field="authorEmail" id="email" />
                        </label>
                        <label htmlFor="name">
                          Name<Text field="authorName" id="name" />
                        </label>
                        <label htmlFor="content">
                          Content<TextArea field="content" id="content" />
                        </label>
                        <button type="submit">Add Comment</button>
                      </form>
                    )}
                  </Form>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </CommonPage>
    );
  }
}

const mapStateToProps = state => ({
  selectedPostId: state.getIn(['blogB', 'selected']),
});

const mapDispatchToProps = dispatch => ({
  select: id => dispatch(Posts.select(id)),
});

const component = styled(Page)`
  .actionButton {
    background: lightblue;
    color: white;
  }

  .titles {
    display: inline-block;
    float: left;
    width: 120px;
  }

  .postContent {
    display: inline-block;
    float: left;
    width: 320px;
    margin: 20px;
    font-size: 14px;
    .title {
      font-weight: bold;
      line-height: 40px;
    }
  }

  .comments {
    margin-top: 20px;
    display: inline-block;
    float: left;
    width: 160px;
    font-size: 14px;

    .title {
      color: grey;
      line-height: 40px;
    }

    .comment {
      border-top: 1px solid lightgrey;
      padding: 5px 0;
      font-size: 13px;
      .author {
        color: darkgrey;
      }
      .content {
        color: grey;
      }
    }
  }
`;

// TODO: fix apollo not updating posts data when re-navigated to it
// TODO: implement selectDefault when posts got
const GET_POSTS = gql`
  {
    posts {
      _id
      title
      body
      comments {
        _id
        content
        author {
          _id
          name
          email
        }
      }
    }
  }
`;

const ADD_COMMENT = gql`
  mutation(
    $postId: ID!
    $content: String
    $authorName: String
    $authorEmail: String!
  ) {
    addComment(
      _id: $postId
      input: {
        content: $content
        author: { name: $authorName, email: $authorEmail }
      }
    ) {
      _id
      comments {
        _id
        content
        author {
          _id
          name
          email
        }
      }
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation($commentId: ID!) {
    deleteComment(_id: $commentId) {
      _id
    }
  }
`;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(GET_POSTS, {
    props: ({ data: { posts } }) => ({ posts }),
  }),
  graphql(ADD_COMMENT, {
    props: ({ ownProps, mutate }) => ({
      addComment: ({ postId, content, authorName, authorEmail }) =>
        mutate({
          variables: { postId, content, authorName, authorEmail },
          optimisticResponse: () => {
            const newComment = {
              __typename: 'Comment',
              _id: -1,
              content,
              author: {
                __typename: 'Author',
                _id: -2,
                name: authorName,
                email: authorEmail,
              },
            };
            const { selectedPostId, posts } = ownProps;
            const existingComments = posts.find(
              post => post._id === selectedPostId,
            ).comments;
            return {
              __typename: 'Mutation',
              addComment: {
                __typename: 'Post',
                _id: postId,
                comments: [...existingComments, newComment],
              },
            };
          },
        }),
    }),
    options: ownProps => ({
      update: (proxy, { data: { addComment } }) => {
        const data = proxy.readQuery({ query: GET_POSTS });
        const { selectedPostId } = ownProps;
        const updatedData = {
          ...data,
          posts: data.posts.map(post => {
            if (post._id === selectedPostId) {
              const updatedPost = {
                ...post,
                comments: addComment.comments,
              };
              return updatedPost;
            }
            return post;
          }),
        };
        proxy.writeQuery({
          query: GET_POSTS,
          data: updatedData,
        });
      },
    }),
  }),
  graphql(DELETE_COMMENT, {
    props: ({ mutate }) => ({
      deleteComment: ({ commentId }) =>
        mutate({
          variables: { commentId },
          optimisticResponse: {
            deleteComment: {
              __typename: 'Comment',
              _id: commentId,
            },
          },
        }),
    }),
    options: ownProps => ({
      update: (proxy, { data: { deleteComment } }) => {
        const data = proxy.readQuery({ query: GET_POSTS });
        const { selectedPostId } = ownProps;
        const updatedData = {
          ...data,
          posts: data.posts.map(post => {
            if (post._id === selectedPostId) {
              const updatedPost = {
                ...post,
                comments: post.comments.filter(
                  comment => comment._id !== deleteComment._id,
                ),
              };
              return updatedPost;
            }
            return post;
          }),
        };
        proxy.writeQuery({
          query: GET_POSTS,
          data: updatedData,
        });
      },
    }),
  }),
  immutableToJS,
)(component);
