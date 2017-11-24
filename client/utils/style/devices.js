import { css } from 'styled-components';

const sizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  phone: 414,
  xs: 320,
};

export const media = Object.keys(sizes).reduce((accumulator, device) => {
  const results = Object.assign({}, accumulator);
  results[device] = (...args) => css`
    @media (max-width: ${sizes[device]}px) {
      ${css(...args)};
    }
  `;
  return results;
}, {});

export const devices = Object.keys(sizes).reduce((accumulator, device) => {
  const results = Object.assign({}, accumulator);
  results[device] = () => `max-width: ${sizes[device]}px`;
  return results;
}, {});

export default devices;
