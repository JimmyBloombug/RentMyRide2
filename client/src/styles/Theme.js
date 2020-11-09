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
      background: {
        default: '#71a892',
      },
      primary: {
        light: '#f85281',
        main: '#c00f55',
        dark: '#89002d',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#beff97',
        main: '#88ff65',
        dark: '#50cb32',
        contrastText: '#000',
      },
      background: {
        paper: '#25493F',
      },
      error: {
        main: '#ff0033',
      },
    },
    overrides: {
      MuiDrawer: {
        paper: {
          backgroundColor: '#25493F',
        },
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
