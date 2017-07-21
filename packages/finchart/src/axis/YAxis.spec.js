import React from 'react';
import { scaleLinear } from 'd3-scale';

import YAxis from './YAxis';

describe('<YAxis />', () => {
  it('renders child tick elements', () => {
    const height = 360;
    const yScale = scaleLinear().domain([0, 100]).range([height, 0]);
    const axis = render(<YAxis {...{ yScale, height }} />);
    expect(axis.find('.tick')).toMatchSnapshot();
  });

  it('renders the group element with a hashed class name', () => {
    const height = 360;
    const yScale = scaleLinear().domain([0, 100]).range([height, 0]);
    const axis = render(<YAxis {...{ yScale, height }} />);
    expect(axis.find('g').prop('class')).toBeDefined();
  });

  it('renders linear scale correctly', () => {
    // TODO
  });

  it('renders time scale correctly', () => {
    // TODO
  });

  it('handles different ticks input', () => {
    // TODO: using tickArguments
  });
});
