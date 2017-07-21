import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ChartBase from '../chart/ChartBase';
import XAxis from '../axis/XAxis';
import YAxis from '../axis/YAxis';
import BarGroup from '../shape/BarGroup';
import { createXScale, createYScale } from '../util/scale';

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
    barGroupPadding: PropTypes.number,
    barGroupHeadroom: PropTypes.number,
    data: PropTypes.array.isRequired,
    fields: PropTypes.object.isRequired,
    axisNames: PropTypes.object,
  };

  static defaultProps = {
    barGroupPadding: 30,
    barGroupHeadroom: 0.2,
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
      barGroupPadding,
      barGroupHeadroom,
      data,
      fields,
      axisNames,
    } = this.props;
    const xScale = createXScale(data, fields, width).padding(barGroupPadding);
    const yScale = createYScale(data, fields, height, barGroupHeadroom);
    return (
      <ChartBase {...{ className, width, height, padding }}>
        <BarGroup {...{ height, width, xScale, yScale, data, fields }} />
        <XAxis {...{ height, width, xScale }} axisName={axisNames.x} />
        <YAxis {...{ height, width, yScale }} axisName={axisNames.y} />
      </ChartBase>
    );
  }
}

export default styled(Component)`
`;
