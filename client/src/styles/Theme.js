import React from 'react';
import {
  MuiThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Theme
const getTheme = (theme) => {
  return createMuiTheme({
    palette: {
      type: theme.paletteType,
      background: {
        default: '#0A0B10',
        paper: '#212833',
      },
      primary: {
        light: '#a0ffff',
        main: '#66fcf1',
        dark: '#16c8be',
        contrastText: '#000',
      },
      secondary: {
        light: '#beff97',
        main: '#88ff65',
        dark: '#50cb32',
        contrastText: '#000',
      },
      error: {
        main: '#ff0033',
      },
    },
    // overrides: {
    //   MuiDrawer: {
    //     paper: {
    //       backgroundColor: '#212121',
    //     },
    //   },
    // },
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
      <CssBaseline>{props.children}</CssBaseline>
    </MuiThemeProvider>
  );
};

// export Theme
export default Theme;
