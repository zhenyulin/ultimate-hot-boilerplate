import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export class FunctionButton extends React.PureComponent {
  static propTypes = {
    func: PropTypes.func,
    text: PropTypes.string,
  };

  static defaultProps = {
    func: () => null,
  };

  render() {
    const { className, text, disabled } = this.props;
    const { func } = this.props;
    return (
      <button
        className={className}
        onClick={() => func()}
      >
        {text}
      </button>
    );
  }
}

export default styled(FunctionButton)`
  height: 30px;
  width: 120px;
  border: none;
  margin: 5px;
  cursor: pointer;
  font-size: 13px;
  text-align: center;
`;
