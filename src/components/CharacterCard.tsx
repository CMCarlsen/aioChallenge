import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card, CardActionArea, CardHeader, CardMedia } from '@material-ui/core/';

import { Character } from '../services/CharacterService';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionArea: {
      borderRadius: 16,
       transition: '0.2s',
       '&:hover': {
         transform: 'scale(1.04)',
       },
    },
    card: {
      minWidth: '125px',
      margin: '0px 5px 10px',
      backgroundColor: theme.palette.primary.dark,
    },
    media: {
      height: 0,
      paddingTop: '80%',
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

export const CharaPage = ({ character }: Props) => {
  const classes = useStyles();

  return (
    <CardActionArea className={classes.actionArea}>
      <Card className={classes.card}>
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
    </CardActionArea>
  );
}

export default CharaPage;
