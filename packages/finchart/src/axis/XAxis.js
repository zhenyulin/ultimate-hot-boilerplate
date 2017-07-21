import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Faux from 'react-faux-dom';
import styled from 'styled-components';
import { axisBottom } from 'd3-axis';
import { select } from 'd3-selection';

export class Component extends PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    xScale: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    tickAmount: PropTypes.number,
    tickArguments: PropTypes.array,
    tickFormat: PropTypes.func,
    tickSize: PropTypes.number,
    tickSizeInner: PropTypes.number,
    tickSizeOuter: PropTypes.number,
    tickOffset: PropTypes.number,
    axisName: PropTypes.string,
    axisNameOffset: PropTypes.number,
  };

  static defaultProps = {
    tickAmount: null,
    tickArguments: null,
    tickFormat: null,
    tickSize: 0,
    tickSizeInner: 0,
    tickSizeOuter: 0,
    tickOffset: 8,
    axisNameOffset: 30,
  };

  render() {
    const {
      className,
      height,
      width,
      xScale,
      tickAmount,
      tickArguments,
      tickFormat,
      tickSize,
      tickSizeInner,
      tickSizeOuter,
      tickOffset,
      axisName,
      axisNameOffset,
    } = this.props;
    const transform = `translate(0,${height})`;

    const axis = axisBottom(xScale)
      .tickArguments(tickArguments)
      .ticks(tickArguments ? null : tickAmount)
      .tickFormat(tickFormat)
      .tickSize(tickSize)
      .tickSizeInner(tickSize ? null : tickSizeInner)
      .tickSizeOuter(tickSize ? null : tickSizeOuter)
      .tickPadding(tickOffset);

    const axisGroup = Faux.createElement('g');
    axisGroup.setAttribute('class', `xaxis-${className}`);
    axisGroup.setAttribute('transform', transform);

    const label = Faux.createElement('text');
    label.setAttribute('class', 'axisName');
    label.setAttribute('transform', `translate(${width / 2}, ${axisNameOffset})`);
    label.innerHTML = axisName;
    axisGroup.appendChild(label);

    const axisDom = select(axisGroup).call(axis);
    return axisDom.node().toReact();
  }
}

export default styled(Component)`
  shape-rendering: crispEdges;
  fill: darkgrey;
  fill-opacity: 1;
  stroke: darkgrey;
  stroke-opacity: 0.3;

  .axisName {
    fill: black;
    font-weight: bold;
    text-anchor: middle;
  }

  .domain {
    fill: none;
    stroke: black;
    stroke-opacity: 0.8;
  }
`;
