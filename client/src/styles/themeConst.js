const colorBG = 'rgba(113, 168, 146, 1)';
const colorPrimary = 'rgba(192, 15, 85, 1)';
const colorSecondary = 'rgba(136,255,101, 1)';
const colorPaper = 'rgba(37, 73, 63, 1)';

const myColors = (color, opacity = 1) => {
  switch (color) {
    case 'bg':
      return colorBG.replace('1)', `${opacity})`);
    case 'primary':
      return colorPrimary.replace('1)', `${opacity})`);
    case 'secondary':
      return colorSecondary.replace('1)', `${opacity})`);
    case 'paper':
      return colorPaper.replace('1)', `${opacity})`);
    default:
      return colorPrimary;
  }
};

const makeColor = (color1 = 1, color2 = 1, color3 = 1, opacity = 1) => {
  return `rgba(${color1},${color2},${color3},${opacity})`;
};

module.exports = {
  colorBG,
  colorPrimary,
  colorSecondary,
  myColors,
  makeColor,
};
