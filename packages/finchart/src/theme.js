import createTheme from 'styled-components-theme';

export const colors = {
  main: '##2F7BBA',
  dark: '##15364F',
  light: '##A7D7FF',
  grey: '#333333',
  red: '#D30008',
  green: '#00A651',
  orange: '#FE9253',
};

export default createTheme(...Object.keys(colors));
