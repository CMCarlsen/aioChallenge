import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: '#000',
      color: '#FFF',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),

    },
    logo: {
      justifyContent: 'left',
    },
  }),
);

export const NavBar = () => {
  const classes = useStyles(); // Use our CSS-in-JS styling from above.

  return (
    <Container className={classes.container} maxWidth={false}>
      <h3 className={classes.logo}>RnM</h3>
    </Container>
  );
}

export default NavBar;
