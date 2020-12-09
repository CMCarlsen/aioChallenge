import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles'; // https://stackoverflow.com/a/64135466
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';

// Using palette to keep it simple
// https://material-ui.com/customization/palette/

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[600],
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
        '*::-webkit-scrollbar': {
          width: '7px',
        },
        '*::-webkit-scrollbar-button': {
          width: 0,
          display: 'none',
        },
        '*::-webkit-scrollbar-thumb': {
          borderRadius: '10px',
          boxShadow: 'inset 0 0 0 10px #272828',
        },
      }
    }
  }
});

export default theme
