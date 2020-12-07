import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

import { Character } from "../services/CharacterService";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth:'125px',
      margin: '0px 5px 10px',
      backgroundColor: theme.palette.primary.dark,
    },
    media: {
      height: 0,
      paddingTop: '56.25%',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      paddingTop: theme.spacing(0.1),
      paddingBottom: theme.spacing(0.5),
    },
    // https://css-tricks.com/flexbox-truncated-text/
    cardHeaderContent: {
      minWidth: 0,
    },
    whiteFont: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: '#fff',
    },
  }),
);

interface Props {
  character: Character,
};

export const CharaPage = ({ character }:Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader classes={{
        content: classes.cardHeaderContent,
        title: classes.whiteFont,
        subheader: classes.whiteFont,
        }}
        title={character.name}
        subheader={`${character.species} - ${character.gender} - ${character.status}`}
      />
      <CardMedia
        className={classes.media}
        image={character.image}
        title={character.name}
      />
    </Card>
  );
}

export default CharaPage;
