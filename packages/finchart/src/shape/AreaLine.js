import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Line from './Line';
import Area from './Area';

export class Component extends PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    fields: PropTypes.object.isRequired,
    // defined: PropTypes.array,
    // curve: PropTypes.string,
  };

  static defaultProps = {
    curve: 'curveLinear',
  };

  render() {
    const {
      className,
      xScale,
      yScale,
      height,
      width,
      data,
      fields,
      // defined,
      // curve,
    } = this.props;

    return (
      <g className={`arealine-${className}`}>
        <Line {...{ height, width, xScale, yScale, data, fields }} />
        <Area {...{ height, width, xScale, yScale, data, fields }} />
      </g>
    );
  }
}

export default styled(Component)`
`;
