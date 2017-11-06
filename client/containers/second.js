// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { push } from 'react-router-redux';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import BasicButton from 'components/elements/basic-button';
import SideNav from 'components/widgets/side-nav';
import { postActions } from 'controllers/actions/post';
import type { PopulatedPost } from 'controllers/types/post';

import immutableToJS from 'utils/components/immutable-to-js';

type Props = {
  className: string,
  posts: [PopulatedPost],
  selectedPostId: string,
  navigate: (url: string) => void,
  select: (id: string) => void,
  addComment: ({
    postId: string,
    content: string,
    authorName: string,
    authorEmail: string,
  }) => void,
};

export class Page extends React.PureComponent<Props> {
  static defaultProps = {
    selectedPostId: '',
    posts: [],
  };

  render() {
    const { className, selectedPostId, posts } = this.props;
    const { navigate, select, addComment } = this.props;
    const selectedPost = posts.find(post => post._id === selectedPostId) || {
      title: '',
      body: '',
      comments: [],
    };
    console.log(this.props);
    return (
      <div className={className}>
        <BasicButton
          className="navButton"
          func={() => navigate('/')}
          text="Back to Index"
        />
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
                  <div className="author">{author.name}:</div>
                  <div className="content">{content}</div>
                </div>
              ))}
              {selectedPostId ? (
                <div className="comment">
                  <label htmlFor="email">
                    Email<input type="text" name="email" />
                  </label>
                  <label htmlFor="name">
                    Name<input type="text" name="name" />
                  </label>
                  <label htmlFor="content">
                    Content<textarea type="text" name="content" />
                  </label>
                  <BasicButton
                    func={() =>
                      addComment({
                        postId: selectedPostId,
                        content: 'test',
                        authorName: 'testName',
                        authorEmail: 'test@gmail.com',
                      })}
                    text="Add Comment"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedPostId: state.getIn(['post', 'selected']),
});

const mapDispatchToProps = dispatch => ({
  navigate: url => dispatch(push(url)),
  select: id => dispatch(postActions.select(id)),
});

const component = styled(Page)`
  width: 640px;
  margin: 240px auto;
  line-height: 30px;

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

const GET_POSTS = gql`
  {
    posts {
      _id
      title
      body
      comments {
        _id
        author {
          _id
          name
          email
        }
        content
      }
    }
  }
`;

const ADD_COMMENT = gql`
  mutation addComment(
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
      title
      body
      comments {
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

export default compose(
  graphql(ADD_COMMENT, {
    props: ({ mutate }) => ({
      addComment: ({ postId, content, authorName, authorEmail }) =>
        mutate({ variables: { postId, content, authorName, authorEmail } }),
    }),
    options: {
      refetchQueries: [{ query: GET_POSTS }],
    },
  }),
  graphql(GET_POSTS, { props: ({ data: { posts } }) => ({ posts }) }),
  connect(mapStateToProps, mapDispatchToProps),
  immutableToJS,
)(component);
