import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { push } from 'react-router-redux';

import BasicButton from 'components/elements/basic-button';
import { postActions } from 'controllers/actions/event';

export class Page extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    posts: PropTypes.shape({
      status: PropTypes.string,
      isError: PropTypes.bool,
      isFetching: PropTypes.bool,
      // TODO: use flow-type to define this
      data: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
        }),
      ),
    }),
    navigate: PropTypes.func,
    get: PropTypes.func,
  };

  static defaultProps = {
    posts: { status: '', isError: false, isFetching: false, data: [] },
  };

  render() {
    const { className, posts } = this.props;
    const { navigate, get } = this.props;
    return (
      <div className={className}>
        <BasicButton
          className="navButton"
          func={() => navigate('/')}
          text="Back to Index"
        />
        <BasicButton className="actionButton" func={get} text="Get Post List" />
        {
          <div>
            <ul>
              {posts.data.map(post => <li key={post._id}>{post.title}</li>)}
            </ul>
          </div>
        }
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
});

const component = styled(Page)`
  width: 480px;
  margin: 240px auto;
  font-family: 'Helvetica';
  line-height: 30px;

  .actionButton {
    background: lightblue;
    color: white;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(component);
