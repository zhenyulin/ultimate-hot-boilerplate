import React from 'react';

import VerticalBarChart from './VerticalBarChart';

describe('<VerticalBarChart />', () => {
  it('renders', () => {
    const chartConfig = {
      width: 640,
      height: 220,
      data: [
        { region: 'Nordic Countries', volume: 30 },
        { region: 'Eastern Europe', volume: -20 },
        { region: 'Latin America', volume: 40 },
        { region: 'Asia', volume: -20 },
        { region: 'Middle East', volume: -30 },
        { region: 'Western Europe', volume: 40 },
      ],
      fields: {
        x: 'volume',
        y: 'region',
      },
      axisNames: {
        x: 'Any X Name',
        y: 'Any Y Name',
      },
    };
    const wrapper = render(<VerticalBarChart {...chartConfig} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles data input format error', () => {
    const chartConfig = {
      width: 960,
      height: 320,
      data: [
        { region: 'CN', volume: 30 },
        { region: 'BE', volume: 20 },
        { region: 'TX', volume: 40 },
        { region: 'JD', volume: 20 },
        { region: 'DF', volume: 10 },
        { region: 'OD', volume: 40 },
      ],
      fields: {
        x: 'type',
        y: 'volume',
      },
    };
    const wrapper = render(<VerticalBarChart {...chartConfig} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles missing data properly', () => {
    // TODO: using tickArguments
  });

  it('handles partial data key pollution', () => {
    // TODO: using tickArguments
  });
});
