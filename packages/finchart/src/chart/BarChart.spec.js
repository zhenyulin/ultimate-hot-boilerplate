import React from 'react';

import BarChart from './BarChart';

describe('<BarChart />', () => {
  it('renders', () => {
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
        x: 'region',
        y: 'volume',
      },
    };
    const wrapper = render(<BarChart {...chartConfig} />);
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
    const wrapper = render(<BarChart {...chartConfig} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles negative y value properly', () => {
    // TODO: using tickArguments
  });

  it('handles missing data properly', () => {
    // TODO: using tickArguments
  });

  it('handles partial data key pollution', () => {
    // TODO: using tickArguments
  });
});
