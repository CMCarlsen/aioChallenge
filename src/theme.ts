import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';

// Using palette to keep it simple
// https://material-ui.com/customization/palette/

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[500],
    },
    secondary: {
      main: green[500],
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#272828 transparent',
        },
        '*::-webkit-scrollbar': {
          width: '12px',
        },
        '*::-webkit-scrollbar-button': {
          width: 0,
          display: 'none',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundClip: 'content-box',
          border: '3px solid transparent',
          borderRadius: '10px',
          boxShadow: 'inset 0 0 0 10px #272828',
        },
        '*::-webkit-scrollbar-corner': {
          backgroundColor: 'transparent',
        },
      }
    }
  }
});

export default theme
