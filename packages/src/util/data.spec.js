import moment from 'moment';

import { formatData, getType, DATA_TYPES } from './data';

describe('formatData', () => {
  it('map the data with keys in fields', () => {
    const data = [
      { volume: 23, price: 21 },
      { volume: 25, price: 39 },
      { volume: 38, price: 30 },
    ];
    const fields = {
      x: 'volume',
      y: 'price',
    };
    const expected = [
      { x: 23, y: 21 },
      { x: 25, y: 39 },
      { x: 38, y: 30 },
    ];
    const formatted = formatData(data, fields);
    expect(formatted).toEqual(expected);
  });

  it('return undefined if fields keys provided wrong', () => {
    const data = [
      { volume: 23, price: 21 },
      { volume: 25, price: 39 },
      { volume: 38, price: 30 },
    ];
    const fields = {
      x: 'date',
      y: 'price',
    };
    const formatted = formatData(data, fields);
    expect(formatted).toBeUndefined();
  });
});

describe('getType', () => {
  it('return type date for native date object', () => {
    const data = new Date();
    const type = getType(data);
    expect(type).toBe(DATA_TYPES.date);
  });

  it('return type date for moment date object', () => {
    const data = moment();
    const type = getType(data);
    expect(type).toBe(DATA_TYPES.date);
  });

  it('return type string for string data', () => {
    const data = 'CN';
    const type = getType(data);
    expect(type).toBe(DATA_TYPES.string);
  });

  it('returns type number for number input', () => {
    const data = 5;
    const type = getType(data);
    expect(type).toBe(DATA_TYPES.number);
  });
});
