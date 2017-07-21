import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';

import ChartBase from './ChartBase';
import XAxis from '../axis/XAxis';
import YAxis from '../axis/YAxis';
import VerticalBarGroup from '../shape/VerticalBarGroup';

/**
 * component:
 *   rotated ordinal XAxis without labels in the tick
 *   horizontal YAxis
 *   XAxis label on top of the chart
 *   BarGroup with Label rotated
 */

/**
 * Construct a BarChart from a catogorised data set
 * Using Ordinal Scale(scaleBand) to show catogories on xAxis
 */
export class Component extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    padding: PropTypes.number,
    headroom: PropTypes.number,
    barGroupPadding: PropTypes.number,
    data: PropTypes.array.isRequired,
    fields: PropTypes.object.isRequired,
    axisNames: PropTypes.object,
  };

  static defaultProps = {
    barGroupPadding: 30,
    headroom: 0.2,
    padding: 60,
    axisNames: {
      x: null,
      y: null,
    },
  };

  render() {
    const {
      className,
      width,
      height,
      padding,
      headroom,
      barGroupPadding,
      data,
      fields,
      axisNames,
    } = this.props;
    const xDataAbs = data.map(d => d[fields.x]).map(d => Math.abs(d));
    const xDomainAbs = max(xDataAbs) * (1 + headroom);
    const xDomain = [-xDomainAbs, xDomainAbs];
    const yData = data.map(d => d[fields.y]);
    const xScale = scaleLinear().domain(xDomain).range([0, width]);
    const yScale = scaleBand().domain(yData).range([0, height]).padding(barGroupPadding);
    const transform = `translate(${xScale(0)}, 0)`;
    return (
      <ChartBase {...{ className, width, height, padding }}>
        <text className="yAxisName" dy={-8} {...{ transform }}>{axisNames.y}</text>
        <VerticalBarGroup {...{ width, xScale, yScale, data, fields }} />
        <XAxis {...{ height, width, xScale }} axisName={axisNames.x} />
        <YAxis {...{ height, width, yScale, transform }} notick />
      </ChartBase>
    );
  }
}

export default styled(Component)`
  .yAxisName {
    fill: black;
    font-weight: bold;
    text-anchor: middle;
    font-size: 11px;
  }
`;
