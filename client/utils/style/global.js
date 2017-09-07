import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export class Component extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const { className, children } = this.props;
    return <div className={className}>{children}</div>;
  }
}

export default styled(Component)`
  font-family: 'Helvetica';
`;
