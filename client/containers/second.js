import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { push } from 'react-router-redux';

import BasicButton from 'components/elements/basic-button';
import SideNav from 'components/widgets/side-nav';
import { postActions } from 'controllers/actions/event';

export class Page extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    posts: PropTypes.shape({
      status: PropTypes.string,
      isError: PropTypes.bool,
      isFetching: PropTypes.bool,
      // TODO: use flow-type to refactor this
      data: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          body: PropTypes.string,
          comments: PropTypes.arrayOf(
            PropTypes.shape({
              content: PropTypes.string,
              author: PropTypes.shape({
                name: PropTypes.string,
                email: PropTypes.string,
              }),
            }),
          ),
        }),
      ),
    }),
    navigate: PropTypes.func,
    get: PropTypes.func,
    select: PropTypes.func,
  };

  static defaultProps = {
    posts: { status: '', isError: false, isFetching: false, data: [] },
  };

  render() {
    const { className, posts } = this.props;
    const { navigate, get, select } = this.props;
    // TODO: move nullable var to props
    // TODO: use normalizr to enhance the data access
    // TODO: create a more universal immutable reducer initialState to avoid null error
    const selectedPost = posts.data.find(p => p._id === posts.selected);
    return (
      <div className={className}>
        <BasicButton
          className="navButton"
          func={() => navigate('/')}
          text="Back to Index"
        />
        <BasicButton className="actionButton" func={get} text="Get Post List" />
        <div className="contentView">
          <SideNav
            className="titles"
            list={posts.data.map(p => ({ id: p._id, value: p.title }))}
            func={select}
          />
          <div className="content">
            {selectedPost ? selectedPost.body : null}
          </div>
          <div className="comments">
            {selectedPost
              ? selectedPost.comments.map(comment => (
                  <div key={comment._id}>
                    {comment.author.name}:{comment.content}
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.event.getIn(['post']).toJS(),
});

const mapDispatchToProps = dispatch => ({
  navigate: location => dispatch(push(location)),
  get: () => dispatch(postActions.get()),
  select: id => dispatch(postActions.select(id)),
});

const component = styled(Page)`
  width: 640px;
  margin: 240px auto;
  font-family: 'Helvetica';
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

  .content {
    display: inline-block;
    width: 240px;
    margin: 0 20px;
  }

  .comments {
    display: inline-block;
    width: 120px;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(component);
