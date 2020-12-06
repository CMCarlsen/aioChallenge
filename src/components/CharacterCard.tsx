import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { Info, Character } from "../services/CharacterService";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: '#cfe8fc',
      color: '#000',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      paddingTop: theme.spacing(0.1),
      paddingBottom: theme.spacing(0.5),
    },
    banana: {
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);

interface Props {
  character: Character,
};

export const CharaPage = ({ character }:Props) => {
  const classes = useStyles(); // Use our CSS-in-JS styling from above.

  return (
    <div className={classes.banana}>
      {character.name}
    </div>
  );
}

export default CharaPage;
