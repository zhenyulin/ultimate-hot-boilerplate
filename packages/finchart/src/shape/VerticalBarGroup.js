import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { formatData } from '../util/data';
import renderError from '../util/render-error';

const renderBarGroup = (className, input, xScale, yScale, width, barHeight, nolabel) => (
  <g className={`bargroup-${className}`} transform={`translate(0, ${-barHeight / 2})`}>
    {input.map((d) => {
      const zeroPosition = xScale(0);
      const negative = d.x < 0;
      const key = d.y;
      const x = negative ? xScale(d.x) : zeroPosition;
      const y = yScale(d.y);
      const barClassName = negative ? 'negative' : null;
      const barWidth = Math.abs(zeroPosition - xScale(d.x));
      return (
        <rect {...{ key, x, y, className: barClassName, width: barWidth, height: barHeight }} />
      );
    })}
    {nolabel ? null : input.map((d) => {
      const zeroPosition = xScale(0);
      const negative = d.x < 0;
      const key = d.y;
      const x = zeroPosition;
      const y = yScale(d.y);
      const textClassName = negative ? 'negative' : null;
      const dx = negative ? 5 : -5;
      const dy = (barHeight / 2) + 1;
      return (
        <text {...{ key, x, y, dx, dy, className: textClassName }} alignmentBaseline="middle">{d.y}</text>
      );
    })}
  </g>
);

export class Component extends PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    fields: PropTypes.object.isRequired,
    barHeight: PropTypes.number,
    nolabel: PropTypes.bool,
  };

  static defaultProps = {
    barHeight: 20,
    nolabel: false,
  };

  render() {
    const {
      className,
      xScale,
      yScale,
      width,
      data,
      fields,
      barHeight,
      nolabel,
    } = this.props;
    const input = formatData(data, fields);
    const barGroupParam = [className, input, xScale, yScale, width, barHeight, nolabel];
    return input ? renderBarGroup(...barGroupParam) : renderError();
  }
}

export default styled(Component)`
  fill: #2f7bba;
  fill-opacity: 0.8;
  stroke: none;

  rect.negative {
    fill: #a7d7ff;
    fill-opacity: 0.8;
  }

  text {
    stroke: black;
    stroke-opacity: 0.8;
    text-anchor: end;
    font-size: 11px;

    &.negative {
      text-anchor: start;
    }
  }
`;
