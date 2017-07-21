import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { formatData } from '../util/data';
import renderError from '../util/render-error';

// TODO: error handling of repeated d.x value in the data set
const renderBarGroup = (className, input, xScale, yScale, height, barWidth) => (
  <g className={`bargroup-${className}`} transform={`translate(${-barWidth / 2},0)`}>
    {input.map(d => (
      <rect
        key={d.x}
        x={xScale(d.x)}
        y={d.y < 0 ? height : yScale(d.y)}
        width={barWidth}
        height={Math.abs(height - yScale(d.y))}
      />
      ))}
  </g>
);

export class Component extends PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    fields: PropTypes.object.isRequired,
    barWidth: PropTypes.number,
  };

  static defaultProps = {
    barWidth: 20,
  };

  render() {
    const {
      className,
      xScale,
      yScale,
      height,
      data,
      fields,
      barWidth,
    } = this.props;
    const input = formatData(data, fields);
    const barGroupParam = [className, input, xScale, yScale, height, barWidth];
    return input ? renderBarGroup(...barGroupParam) : renderError();
  }
}

export default styled(Component)`
  fill: #2f7bba;
  fill-opacity: 0.8;
  stroke: none;
`;
