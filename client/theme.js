import createTheme from 'styled-components-theme';

export const colors = {
  blue: '#00A5FC',
  orange: '#FF4F0F',
  dark: '#3C5463',
  light: 'rgba(255,255,255,0.3)',
};

export default createTheme(...Object.keys(colors));
