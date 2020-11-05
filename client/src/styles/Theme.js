import React from 'react';
import {
  MuiThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core/styles';

// Theme
const getTheme = (theme) => {
  return createMuiTheme({
    palette: {
      type: theme.paletteType,
      primary: {
        light: '#34eb44',
        main: '#0e0b16',
        dark: '#09070f',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#6b45f6',
        main: '#4717f4',
        dark: '#3110aa',
        contrastText: '#ffffff',
      },
      tertiary: {
        light: '#b460d4',
        main: '#a239ca',
        dark: '#71278d',
        contrastText: '#ffffff',
      },
    },
    typography: {
      fontFamily: ["'Poppins', sans-serif"].join(','),
      h1: {
        fontFamily: "'Montserrat Alternates', sans-serif",
      },
      h6: {
        fontFamily: "'Montserrat Alternates', sans-serif",
        fontWeight: 'bold',
      },
    },
    breakpoints: {
      values: {
        xs: 576,
        sm: 768,
        md: 992,
        lg: 1200,
      },
    },
  });
};

const Theme = (props) => {
  return (
    <MuiThemeProvider theme={getTheme({ paletteType: 'dark' })}>
      {props.children}
    </MuiThemeProvider>
  );
};

// export Theme
export default Theme;
