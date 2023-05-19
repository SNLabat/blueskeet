import React, { createContext, useContext, useMemo } from 'react';
import { TextStyle, useColorScheme, ViewStyle } from 'react-native';
import { darkTheme, defaultTheme, slateTheme, grayTheme, zincTheme, neutralTheme, stoneTheme, redTheme, orangeTheme, amberTheme, yellowTheme, limeTheme, greenTheme, emeraldTheme, tealTheme, cyanTheme, skyTheme, blueTheme, indigoTheme, violetTheme, purpleTheme, fuchsiaTheme, pinkTheme, roseTheme } from './themes';

export type ColorScheme =
  | 'light'
  | 'dark'
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'
  | 'default'
  | 'primary'
  | 'secondary'
  | 'inverted'
  | 'error';

export type PaletteColor = {
  background: string;
  backgroundLight: string;
  text: string;
  textLight: string;
  textInverted: string;
  link: string;
  border: string;
  borderDark: string;
  icon: string;
  [k: string]: string;
};

export type Palette = Record<PaletteColorName, PaletteColor>;

export type ShapeName = 'button' | 'bigButton' | 'smallButton';
export type Shapes = Record<ShapeName, ViewStyle>;

export type TypographyVariant =
  | '2xl-thin'
  | '2xl'
  | '2xl-medium'
  | '2xl-bold'
  | '2xl-heavy'
  | 'xl-thin'
  | 'xl'
  | 'xl-medium'
  | 'xl-bold'
  | 'xl-heavy'
  | 'lg-thin'
  | 'lg'
  | 'lg-medium'
  | 'lg-bold'
  | 'lg-heavy'
  | 'md-thin'
  | 'md'
  | 'md-medium'
  | 'md-bold'
  | 'md-heavy'
  | 'sm-thin'
  | 'sm'
  | 'sm-medium'
  | 'sm-bold'
  | 'sm-heavy'
  | 'xs-thin'
  | 'xs'
    | 'xs-medium'
    | 'xs-bold'
    | 'xs-heavy'
    | 'title-2xl'
    | 'title-xl'
    | 'title-lg'
    | 'title'
    | 'title-sm'
    | 'post-text-lg'
    | 'post-text'
    | 'button'
    | 'button-lg'
    | 'mono';

  export type Typography = Record<TypographyVariant, TextStyle>;

  export interface Theme {
    colorScheme: ColorScheme;
    palette: Palette;
    shapes: Shapes;
    typography: Typography;
  }

  export interface ThemeProviderProps {
    theme?: ColorScheme;
  }

  export const ThemeContext = createContext<Theme>(defaultTheme);

  export const useTheme = (): Theme => useContext(ThemeContext);

  export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    theme,
    children,
  }) => {
    const colorScheme = useColorScheme();

    const selectedTheme = theme || colorScheme || 'light';

    const getTheme = (theme: ColorScheme): Theme => {
      switch (theme) {
        case 'light':
          return defaultTheme
        case 'dark':
          return darkTheme
        case 'slate':
          return slateTheme
        case 'gray':
          return grayTheme
        case 'zinc':
          return zincTheme
        case 'neutral':
          return neutralTheme
        case 'stone':
          return stoneTheme
        case 'red':
          return redTheme
        case 'orange':
          return orangeTheme
        case 'amber':
          return amberTheme
        case 'yellow':
          return yellowTheme
        case 'lime':
          return limeTheme
        case 'green':
          return greenTheme
        case 'emerald':
          return emeraldTheme
        case 'teal':
          return tealTheme
        case 'cyan':
          return cyanTheme
        case 'sky':
          return skyTheme
        case 'blue':
          return blueTheme
        case 'indigo':
          return indigoTheme
        case 'violet':
          return violetTheme
        case 'purple':
          return purpleTheme
        case 'fuchsia':
          return fuchsiaTheme
        case 'pink':
          return pinkTheme
        case 'rose':
          return roseTheme
        default:
          return defaultTheme
      }
    };

    const value = useMemo(() => getTheme(selectedTheme), [selectedTheme])

    return (
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
  }
