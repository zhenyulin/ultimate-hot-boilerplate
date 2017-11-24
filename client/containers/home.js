import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import BasicButton from 'components/elements/basic-button';
import CommonPage from 'components/templates/common-page';
import { countActions } from 'controllers/actions/count';
import { messageActions } from 'controllers/actions/message';

import { pages } from 'router';

export class Page extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    count: PropTypes.number,
    add: PropTypes.func,
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
    const { add, get } = this.props;
    return (
      <CommonPage className={className} pages={pages}>
        <BasicButton
          className="statusButton"
          func={add}
          text={count.toString()}
        />
        <BasicButton className="actionButton" func={get} text="Get Message" />
        <div className="title">{title}</div>
        <div className="body">{body}</div>
      </CommonPage>
    );
  }
}

const mapStateToProps = state => ({
  count: state.getIn(['count']),
  title: state.getIn(['message', 'data', 0, 'title']),
  body: state.getIn(['message', 'data', 0, 'body']),
});

const mapDispatchToProps = dispatch => ({
  add: () => dispatch(countActions.add()),
  get: () => dispatch(messageActions.get()),
});

const component = styled(Page)`
  .statusButton {
    background: lightblue;
    color: white;
  }

  .actionButton {
    background: lightblue;
    color: white;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(component);
