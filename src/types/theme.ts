export type Theme = 'light' | 'dark';

export interface ThemeColors {
  primary: {
    light: string;
    DEFAULT: string;
    dark: string;
  };
  background: {
    primary: string;
    secondary: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
}