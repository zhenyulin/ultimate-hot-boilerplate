import React from 'react';
import moment from 'moment';
import { render } from 'enzyme';
import LineChart from './LineChart';

describe('<LineChart />', () => {
  it('renders linear data', () => {
    const chartConfig = {
      width: 960,
      height: 320,
      data: [
        { volume: 0, price: 9 },
        { volume: 10, price: 30 },
        { volume: 40, price: 10 },
        { volume: 50, price: 40 },
        { volume: 100, price: 30 },
      ],
      fields: {
        x: 'volume',
        y: 'price',
      },
    };
    const wrapper = render(<LineChart {...chartConfig} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders time series data of native date object', () => {
    const chartConfig = {
      width: 960,
      height: 320,
      data: [
        { date: new Date(2017, 0, 1), price: 30 },
        { date: new Date(2017, 0, 15), price: 20 },
        { date: new Date(2017, 1, 1), price: 40 },
      ],
      fields: {
        x: 'date',
        y: 'price',
      },
    };
    const wrapper = render(<LineChart {...chartConfig} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders time series data of moment date object', () => {
    const chartConfig = {
      width: 960,
      height: 320,
      data: [
        { date: moment('2017-01-01'), price: 30 },
        { date: moment('2017-01-15'), price: 20 },
        { date: moment('2017-02-01'), price: 40 },
      ],
      fields: {
        x: 'date',
        y: 'price',
      },
    };
    const wrapper = render(<LineChart {...chartConfig} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles data input format error', () => {
    const chartConfig = {
      width: 960,
      height: 320,
      data: [
        { date: new Date(2017, 0, 1), price: 30 },
        { date: new Date(2017, 0, 15), price: 20 },
        { date: new Date(2017, 1, 1), price: 40 },
      ],
      fields: {
        x: 'region',
        y: 'price',
      },
    };
    const wrapper = render(<LineChart {...chartConfig} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles missing data properly', () => {
    // TODO: using tickArguments
  });

  it('handles partial data key pollution', () => {
    // TODO: using tickArguments
  });
});
