import React from 'react';

import ChartBase from './ChartBase';

describe('<ChartBase />', () => {
  it('renders', () => {
    const chartConfig = {
      width: 960,
      height: 320,
    };
    const wrapper = render(<ChartBase {...chartConfig} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders children elements', () => {

  });
});
