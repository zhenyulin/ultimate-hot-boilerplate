import moment from 'moment';

import { createXScale, createYScale } from './scale';

describe('createXScale', () => {
  it('create linear scale for number data', () => {
    const data = [
      { volume: 23, price: 21 },
      { volume: 25, price: 39 },
      { volume: 38, price: 30 },
    ];
    const fields = {
      x: 'volume',
      y: 'price',
    };
    const width = 320;
    const xScale = createXScale(data, fields, width);
    expect(xScale.domain()).toEqual([23, 38]);
    expect(xScale.range()).toEqual([0, width]);
  });

  it('create time scale for time data', () => {
    const data = [
      { date: moment('2017-02-01'), price: 21 },
      { date: moment('2017-02-05'), price: 39 },
      { date: moment('2017-02-07'), price: 30 },
    ];
    const fields = {
      x: 'date',
      y: 'price',
    };
    const width = 320;
    const xScale = createXScale(data, fields, width);
    const domain = [moment('2017-02-01').toDate(), moment('2017-02-07').toDate()];
    expect(xScale.domain()).toEqual(domain);
    expect(xScale.range()).toEqual([0, width]);
  });

  it('create band scale for ordinal data', () => {
    const data = [
      { type: 'e', price: 21 },
      { type: 'f', price: 39 },
      { type: 'x', price: 30 },
    ];
    const fields = {
      x: 'type',
      y: 'price',
    };
    const width = 320;
    const xScale = createXScale(data, fields, width);
    expect(xScale.domain()).toEqual(['e', 'f', 'x']);
    expect(xScale.range()).toEqual([0, width]);
  });
});

describe('createYScale', () => {
  it('create linear scale with headroom', () => {
    const data = [
      { volume: 23, price: 21 },
      { volume: 25, price: 39 },
      { volume: 38, price: 30 },
    ];
    const fields = {
      x: 'volume',
      y: 'price',
    };
    const height = 320;
    const yScale = createYScale(data, fields, height);
    expect(yScale.domain()).toEqual([0, 39 * 1.2]);
    expect(yScale.range()).toEqual([height, 0]);
  });
});
