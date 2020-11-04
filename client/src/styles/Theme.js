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
        light: '#34323c',
        main: '#0e0b16',
        dark: '#000000',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#894dff',
        main: '#4717f4',
        dark: '#0000c0',
        contrastText: '#ffffff',
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
