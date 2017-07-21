import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { area } from 'd3-shape';

import { formatData } from '../util/data';
import renderError from '../util/render-error';

export class Component extends PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
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
      data,
      fields,
      // defined,
      // curve,
    } = this.props;
    const input = formatData(data, fields);
    const path = area()
      .x(d => xScale(d.x))
      .y1(d => yScale(d.y))
      .y0(height);

    return (
      input ? <path className={`area-${className}`} d={path(input)} /> : renderError()
    );
  }
}

export default styled(Component)`
  fill: #2f7bba;
  fill-opacity: 0.8;
  stroke: none;
`;
