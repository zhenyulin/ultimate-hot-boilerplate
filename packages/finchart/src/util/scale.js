import { extent, max } from 'd3-array';
import { scaleLinear, scaleTime, scaleBand } from 'd3-scale';

import { getType, DATA_TYPES } from './data';

/**
 * create the scale with scale type corresponding to input data
 * default type is linear scale
 * error in data fields will be passed to and handled in the shape component
 * @param  {Array} data   input data
 * @param  {Object} fields key mapping specs
 * @param  {Number} width  chart width
 * @return {Object}        d3 scale object
 */
export function createXScale(data, fields, width) {
  // OPT: do a scanning through the array?
  const dataType = getType(data[0][fields.x]);
  let scale;
  let domain;
  const xData = data.map(d => d[fields.x]);
  const range = [0, width];
  switch (dataType) {
    case DATA_TYPES.number:
      scale = scaleLinear();
      domain = extent(xData);
      break;
    case DATA_TYPES.date:
      scale = scaleTime();
      domain = extent(xData);
      break;
    case DATA_TYPES.string:
      scale = scaleBand();
      domain = xData;
      break;
    default:
      scale = scaleBand();
      domain = xData;
  }
  scale.domain(domain).range(range);
  return scale;
}

/**
 * create a linear scale with headroom from the data input
 * @param  {Array} data     input data
 * @param  {Object} fields   key mapping specs
 * @param  {Number} height   chart height
 * @param  {Number} headroom ratio of headroom
 * @return {Object}          d3 scale object
 */
// TODO: supports scale creation from targets and data
// QUESTION: what use cases are there for developers to adjust the y extent?
export function createYScale(data, fields, height, headroom = 0.2) {
  const dataMax = max(data.map(d => d[fields.y]));
  const domain = [0, dataMax * (1 + headroom)];
  const scale = scaleLinear().domain(domain).range([height, 0]);
  return scale;
}
