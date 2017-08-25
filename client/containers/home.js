// @flow

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { push } from 'react-router-redux';

import BasicButton from 'components/elements/basic-button';
import Paragraph from 'components/elements/paragraph.tsx';

import CountAction from 'controllers/actions/count.ts';
import { messageActions } from 'controllers/actions/event';

import type { State } from 'controllers/types/state';

type Props = {
  className: String,
  count: Number,
  message: {
    title: String,
    body: String,
  },
  add: Function,
  navigate: Function,
  get: Function,
};

export class Page extends React.PureComponent<void, Props, void> {
  render() {
    const { className, count, message } = this.props;
    const { add, navigate, get } = this.props;
    return (
      <div className={className}>
        <BasicButton className="actionButton" func={get} text="Get Message" />
        <BasicButton
          className="statusButton"
          func={add}
          text={count.toString()}
        />
        <BasicButton
          className="navButton"
          func={() => navigate('/second')}
          text="To Second Page"
        />
        <Paragraph {...message} />
      </div>
    );
  }
}

const mapStateToProps = ({ count, event }: State) => ({
  count: count.get('current'),
  message: event.getIn(['message', 'data']).toJS(),
});

const mapDispatchToProps = (dispatch: *) => ({
  add: () => dispatch(CountAction.add()),
  navigate: location => dispatch(push(location)),
  get: () => dispatch(messageActions.get()),
});

const component = styled(Page)`
  width: 480px;
  margin: 240px auto;
  font-family: 'Helvetica';
  line-height: 30px;

  .actionButton {
    background: orange;
    color: white;
  }

  .statusButton {
    background: lightblue;
    color: white;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(component);
