import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles' // https://material-ui.com/styles/api/#themeprovider
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline' // https://material-ui.com/components/css-baseline/

import theme from "./theme";
import NavBar from "./components/NavBar";
import CharaPage from "./pages/CharaPage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexFlow: "column",
      height: "100vh"
    }
  }),
);

// TODO: Remove these in place of page imports later
const HomePage = () => (
  <div>
    <h1>HOME</h1>
  </div>
);

// Use <Switch> to route based on URL bar.
// Only show homepage if path is exact root-page
// Wrap with ThemeProvider to allow child components access
// to theming as Props.
function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <NavBar />
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path='/characters' component={CharaPage}/>
            <Route />
          </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
