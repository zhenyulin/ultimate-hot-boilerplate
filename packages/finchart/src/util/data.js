// @flow
import moment from 'moment';

/**
 * map the keys of the data according to the provided fields and handle common errors
 * @param  {Array} data   input data array
 * @param  {Object} fields the specification of fields
 * @return {Array}        formatted output
 * @return {undefined}        in case of error
 */
export function formatData(data, fields) {
  const { x, y } = fields;
  const output = [];
  for (let i = 0; i < data.length; i += 1) {
    const d = data[i];
    if (d[x] === undefined || d[y] === undefined) {
      return undefined;
    }
    const formatted = { x: d[x], y: d[y] };
    output.push(formatted);
  }
  return output;
}

/**
 * the enumeration of data types support for scale type mapping
 * @type {Object}
 */
export const DATA_TYPES = {
  number: 'number',
  date: 'date',
  string: 'string',
  default: undefined,
};

/**
 * check the type of the data to help decide the scale type
 * @param  {anything} d the data to be checked
 * @return {string}   the data type enumeration
 */
export function getType(d) {
  if (d instanceof Date && typeof d.getMonth === 'function') {
    return DATA_TYPES.date;
  }
  // TODO: remove dependancy on moment.js
  if (d instanceof moment && d.isValid()) {
    return DATA_TYPES.date;
  }
  if (typeof d === 'string') {
    return DATA_TYPES.string;
  }
  if (typeof d === 'number') {
    return DATA_TYPES.number;
  }
  return DATA_TYPES.default;
}
