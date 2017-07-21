import React from 'react';
import { scaleLinear, scaleTime } from 'd3-scale';

import XAxis from './XAxis';

describe('<XAxis />', () => {
  it('renders child tick elements correctly', () => {
    const width = 900;
    const height = 360;
    const xScale = scaleLinear().range([0, width]).domain([0, 100]);
    const axis = render(<XAxis {...{ xScale, width, height }} />);
    const ticks = axis.find('.tick');
    expect(ticks).toMatchSnapshot();
  });

  it('renders domain axis', () => {
    const width = 900;
    const height = 360;
    const xScale = scaleLinear().range([0, width]).domain([0, 100]);
    const axis = render(<XAxis {...{ xScale, width, height }} />);
    const ticks = axis.find('.domain');
    expect(ticks).toMatchSnapshot();
  });

  it('renders axisName', () => {
    const width = 900;
    const height = 360;
    const xScale = scaleLinear().range([0, width]).domain([0, 100]);
    const axis = render(<XAxis {...{ xScale, width, height }} axisName="axisName" />);
    const ticks = axis.find('.axisName');
    expect(ticks).toMatchSnapshot();
  });

  it('renders the svg group wrapper', () => {
    const width = 900;
    const height = 360;
    const xScale = scaleLinear().range([0, width]).domain([0, 100]);
    const axis = render(<XAxis {...{ xScale, width, height }} />);
    expect(axis.find('g').prop('transform')).toBe(`translate(0,${height})`);
  });

  it('sets a hashed class name', () => {
    const width = 900;
    const height = 360;
    const xScale = scaleLinear().range([0, width]).domain([0, 100]);
    const axis = render(<XAxis {...{ xScale, width, height }} />);
    expect(axis.find('g').prop('class')).toBeDefined();
  });

  it('renders linear scale correctly', () => {
    const width = 900;
    const height = 360;
    const xScale = scaleLinear().range([0, width]).domain([0, 100]);
    const axis = render(<XAxis {...{ xScale, width, height }} />);
    const ticks = axis.find('.tick');
    expect(ticks).toMatchSnapshot();
  });

  it('renders time scale correctly', () => {
    const width = 900;
    const height = 360;
    const timeDomain = [new Date(2017, 0, 1), new Date(2017, 1, 1)];
    const xScale = scaleTime().domain(timeDomain).range([0, width]);
    const axis = render(<XAxis {...{ xScale, width, height }} />);
    const ticks = axis.find('.tick');
    expect(ticks).toMatchSnapshot();
  });

  it('handles different ticks input', () => {
    const width = 900;
    const height = 360;
    const xScale = scaleLinear().range([0, width]).domain([0, 100]);
    const tickAmount = 5;
    const axis = render(<XAxis {...{ xScale, width, height, tickAmount }} />);
    const ticks = axis.find('.tick');
    expect(ticks).toMatchSnapshot();
  });

  it('handles tickArguments over ticks', () => {
    // TODO: using tickArguments
  });
});
