import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { push } from 'react-router-redux';

import BasicButton from 'components/elements/basic-button';
import { messageActions } from 'controllers/actions/message';

export class Page extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    navigate: PropTypes.func,
    get: PropTypes.func,
  };

  static defaultProps = {
    title: '',
    body: '',
  };

  render() {
    const { className, title, body } = this.props;
    const { navigate, get } = this.props;
    return (
      <div className={className}>
        <BasicButton
          className="actionButton"
          func={get}
          text="Get Message"
        />
        <BasicButton
          className="navButton"
          func={() => navigate('/')}
          text="Back to Index"
        />
        <div className="title">{title}</div>
        <div className="body">{body}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  title: state.message.getIn(['message', 'title']),
  body: state.message.getIn(['message', 'body']),
});

const mapDispatchToProps = dispatch => ({
  navigate: location => dispatch(push(location)),
  get: () => dispatch(messageActions.get()),
});

const component = styled(Page)`
  width: 360px;
  margin: 240px auto;
  font-family: 'Helvetica';
  line-height: 30px;

  .actionButton {
    background: lightblue;
    color: white;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(component);
