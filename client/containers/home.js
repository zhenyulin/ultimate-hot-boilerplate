import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { push } from 'react-router-redux';

import BasicButton from 'components/elements/basic-button';
import { countActions } from 'controllers/actions/count';
import { messageActions } from 'controllers/actions/message';

export class Page extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    count: PropTypes.number,
    add: PropTypes.func,
    navigate: PropTypes.func,
    title: PropTypes.string,
    body: PropTypes.string,
    get: PropTypes.func,
  };

  static defaultProps = {
    count: 0,
    title: '',
    body: '',
  };

  render() {
    const { className, count, title, body } = this.props;
    const { add, get, navigate } = this.props;
    return (
      <div className={className}>
        <BasicButton
          className="statusButton"
          func={add}
          text={count.toString()}
        />
        <BasicButton className="actionButton" func={get} text="Get Message" />
        <BasicButton
          className="navButton"
          func={() => navigate('/second')}
          text="To Second Page"
        />
        <div className="title">{title}</div>
        <div className="body">{body}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  count: state.getIn(['count']),
  title: state.getIn(['message', 'data', 'title']),
  body: state.getIn(['message', 'data', 'body']),
});

const mapDispatchToProps = dispatch => ({
  add: () => dispatch(countActions.add()),
  navigate: location => dispatch(push(location)),
  get: () => dispatch(messageActions.get()),
});

const component = styled(Page)`
  width: 640px;
  margin: 240px auto;
  line-height: 30px;

  .statusButton {
    background: lightblue;
    color: white;
  }

  .actionButton {
    background: lightblue;
    color: white;
  }
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
