// @flow

import React from 'react';
import styled from 'styled-components';

type Props = {
  className: String,
  text: String,
  func: Function,
};

export class BasicButton extends React.PureComponent<void, Props, void> {
  render() {
    const { className, text } = this.props;
    const { func } = this.props;
    return (
      <button className={className} onClick={() => func()}>
        {text}
      </button>
    );
  }
}

export default styled(BasicButton)`
  height: 30px;
  width: 120px;
  border: none;
  margin: 5px;
  cursor: pointer;
  font-size: 13px;
  text-align: center;
`;
