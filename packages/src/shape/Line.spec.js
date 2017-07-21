import React from 'react';
import { scaleLinear } from 'd3-scale';

import Line from './Line';

describe('<Line />', () => {
  it('handles data input format error', () => {
    const width = 960;
    const height = 360;
    const xScale = scaleLinear().domain([0, 100]).range([0, width]);
    const yScale = scaleLinear().domain([0, 100]).range([height, 0]);
    const data = [
      { supply: 0, price: 100 },
      { supply: 30, price: 90 },
      { supply: 100, price: 0 },
    ];
    const fields = {
      x: 'volume',
      y: 'price',
    };
    const wrapper = render(<Line {...{ height, width, xScale, yScale, data, fields }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders area', () => {
    const width = 960;
    const height = 360;
    const xScale = scaleLinear().domain([0, 100]).range([0, width]);
    const yScale = scaleLinear().domain([0, 100]).range([height, 0]);
    const data = [
      { supply: 0, price: 100 },
      { supply: 30, price: 90 },
      { supply: 100, price: 0 },
    ];
    const fields = {
      x: 'supply',
      y: 'price',
    };
    const wrapper = render(<Line {...{ height, width, xScale, yScale, data, fields }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles missing data properly');

  it('handles partial data key pollution');  // TODO: using tickArguments
});
