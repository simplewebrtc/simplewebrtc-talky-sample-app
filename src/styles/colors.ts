import { colorFromHsl } from '../utils/colorify';

const colors = {
  blueSaturatedDarker: colorFromHsl(195, 100 / 100, 5 / 100),
  blueSaturatedDark: colorFromHsl(195, 100 / 100, 10 / 100),
  blueSaturated: colorFromHsl(195, 100 / 100, 14 / 100),
  blueSaturatedLight: colorFromHsl(195, 46 / 100, 22 / 100),
  blueSaturatedLighter: colorFromHsl(195, 46 / 100, 42 / 100),

  blue: colorFromHsl(195, 100 / 100, 46 / 100),
  blueLight: colorFromHsl(195, 100 / 100, 70 / 100),
  blueLighter: colorFromHsl(195, 100 / 100, 95 / 100),

  // Monochromatic

  grayDarker: colorFromHsl(194, 7 / 100, 16 / 100),
  grayDark: colorFromHsl(194, 5 / 100, 33 / 100),
  gray: colorFromHsl(194, 5 / 100, 54 / 100),
  grayLight: colorFromHsl(194, 9 / 100, 82 / 100),
  grayLighter: colorFromHsl(194, 9 / 100, 92 / 100),

  // Pinks

  pink: colorFromHsl(326, 94 / 100, 48 / 100),
  pinkLight: colorFromHsl(344, 97 / 100, 88 / 100),
  pinkLighter: colorFromHsl(326, 94 / 100, 96 / 100),

  // Greens

  green: colorFromHsl(142, 47 / 100, 50 / 100),
  greenLight: colorFromHsl(142, 48 / 100, 85 / 100),
  greenLighter: colorFromHsl(142, 48 / 100, 94 / 100),

  // Reds

  red: colorFromHsl(342, 100 / 100, 45 / 100),
  redLight: colorFromHsl(342, 100 / 100, 89 / 100),
  redLighter: colorFromHsl(342, 100 / 100, 95 / 100),

  // Orange

  orange: colorFromHsl(34, 98 / 100, 48 / 100),
  orangeLight: colorFromHsl(34, 98 / 100, 74 / 100),
  orangeLighter: colorFromHsl(34, 98 / 100, 92 / 100)
};

export default colors;
