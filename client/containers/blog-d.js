// @flow

import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form, Text, TextArea } from 'react-form';

import CommonPage from 'components/templates/common-page';
import SideNav from 'components/widgets/side-nav';
import { Posts, Comments } from 'controllers/actions/blog-d';
import type { PopulatedPost } from 'controllers/types/blog';

import immutableToJS from 'utils/components/immutable-to-js';

import { pages } from 'router';

type Props = {
  className: string,
  posts: [PopulatedPost],
  selectedPostId: string,
  getPosts: () => void,
  selectPost: (id: string) => void,
  addComment: ({
    postId: string,
    content: string,
    authorName: string,
    authorEmail: string,
  }) => void,
  removeComment: ({ id: string, cid: string }) => void,
};

export class Page extends React.PureComponent<Props> {
  static defaultProps = {
    selectedPostId: '',
  };

  componentWillMount() {
    this.props.getPosts();
  }

  render() {
    const { className, posts, selectedPostId } = this.props;
    const { selectPost, addComment, removeComment } = this.props;
    const selectedPost = posts.find(post => post._id === selectedPostId) || {
      title: '',
      body: '',
      comments: [],
    };
    return (
      <CommonPage className={className} pages={pages}>
        <div className="note">
          built with Nested Redux State, and Prepopulated REST API
        </div>
        <div className="contentView">
          <SideNav
            className="titles"
            list={posts.map(post => ({
              id: post._id,
              value: post.title,
            }))}
            func={selectPost}
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
                    onClick={() =>
                      removeComment({ id: selectedPostId, cid: _id })
                    }
                  >
                    X
                  </button>
                  <div className="author">{author.name}:</div>
                  <div className="content">{content}</div>
                </div>
              ))}
              {selectedPost ? (
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
  posts: state.getIn(['blogD', 'data']),
  selectedPostId: state.getIn(['blogD', 'selected']),
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(Posts.get()),
  selectPost: id => dispatch(Posts.select(id)),
  addComment: ({ postId, content, authorName, authorEmail }) =>
    dispatch(Comments.add({ postId, content, authorName, authorEmail })),
  removeComment: ({ id, cid }) => dispatch(Comments.remove({ id, cid })),
});

const component = styled(Page)`
  .titles {
    display: inline-block;
    float: left;
    width: 120px;
  }

  .postContent {
    display: inline-block;
    float: left;
    width: 420px;
    margin: 20px;
    font-size: 14px;

    .title {
      font-weight: bold;
      line-height: 40px;
    }
  }

  .comments {
    margin: 20px 0 0 40px;
    display: inline-block;
    float: left;
    width: 120px;
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  immutableToJS,
)(component);
