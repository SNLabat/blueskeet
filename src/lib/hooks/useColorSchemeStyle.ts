import { useTheme } from 'lib/ThemeContext';
import { Theme } from 'lib/themes';

export function useColorSchemeStyle<T>(
  lightStyle: T,
  darkStyle: T,
  slateStyle: T,
  grayStyle: T,
  zincStyle: T,
  neutralStyle: T,
  stoneStyle: T,
  redStyle: T,
  orangeStyle: T,
  amberStyle: T,
  yellowStyle: T,
  limeStyle: T,
  greenStyle: T,
  emeraldStyle: T,
  tealStyle: T,
  cyanStyle: T,
  skyStyle: T,
  blueStyle: T,
  indigoStyle: T,
  violetStyle: T,
  purpleStyle: T,
  fuchsiaStyle: T,
  pinkStyle: T,
  roseStyle: T
) {
  const colorScheme = useTheme().colorScheme;
  let style: T;
  switch (colorScheme) {
    case 'dark':
      style = darkStyle;
      break;
    case 'slate':
      style = slateStyle;
      break;
    case 'gray':
      style = grayStyle;
      break;
    case 'zinc':
      style = zincStyle;
      break;
    case 'neutral':
      style = neutralStyle;
      break;
    case 'stone':
      style = stoneStyle;
      break;
    case 'red':
      style = redStyle;
      break;
    case 'orange':
      style = orangeStyle;
      break;
    case 'amber':
      style = amberStyle;
      break;
    case 'yellow':
      style = yellowStyle;
      break;
    case 'lime':
      style = limeStyle;
      break;
    case 'green':
      style = greenStyle;
      break;
    case 'emerald':
      style = emeraldStyle;
      break;
    case 'teal':
      style = tealStyle;
      break;
    case 'cyan':
      style = cyanStyle;
      break;
    case 'sky':
      style = skyStyle;
      break;
    case 'blue':
      style = blueStyle;
      break;
    case 'indigo':
      style = indigoStyle;
      break;
    case 'violet':
      style = violetStyle;
      break;
    case 'purple':
      style = purpleStyle;
      break;
    case 'fuchsia':
      style = fuchsiaStyle;
      break;
    case 'pink':
      style = pinkStyle;
      break;
    case 'rose':
      style = roseStyle;
      break;
    default:
      style = lightStyle;
      break;
  }
  return style;
}