import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export class Component extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    foo: PropTypes.string,
  };

  static defaultProps = {
    foo: 'hello world',
  };

  render() {
    const { className } = this.props;
    const { foo } = this.props;
    return (
      <div {...{ className }}>
        { foo }
      </div>
    );
  }
}

export default styled(Component)`

`;
