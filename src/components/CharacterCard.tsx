import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, CardContent, CardActions, Typography, Button } from '@material-ui/core/';

import { Character } from '../services/CharacterService';
import { Location, fetchLocationData } from "../services/LocationService";
import { Episode, fetchEpisodeData } from "../services/EpisodeService";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionArea: {
      borderRadius: 16,
      transition: '0.2s',
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
    // https://css-tricks.com/flexbox-truncated-text/
    cardHeaderContent: {
      minWidth: 0,
    },
    whiteFont: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    overlay: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      overflow: 'hidden',
      width: '100%',
      height: '0',
      transition: '.5s ease',
    },
    unhideOverlay: {
      height: '100%',
    },
    infoOverlayBox: {
      paddingTop: '0px',
    },
    infoContentBox: {
      paddingLeft: '10px',
      marginBottom: '5px',
    },
  }),
);

interface Props {
  character: Character,
  color: string,
};

export const CharaPage = ({ character, color }: Props) => {
  const [firstEp, setFirstEp] = useState<Episode>({ name: '' });
  const [lastEp, setLastEp] = useState<Episode>({ name: '' });
  const [origin, setOrigin] = useState<Location>({ name: '' });
  const [location, setLocation] = useState<Location>({ name: '' });

  useEffect(() => {
    async function pullCharacterData() {
      const cFirstEp:Episode = await fetchEpisodeData(character.episode[0]);
      const cLastEp:Episode = await fetchEpisodeData(character.episode[character.episode.length - 1]);
      const cOrigin:Location = await fetchLocationData(character.origin.url);
      const cLocation:Location = await fetchLocationData(character.location.url);

      setFirstEp(cFirstEp);
      setLastEp(cLastEp);
      setOrigin(cOrigin);
      setLocation(cLocation);
    }

    pullCharacterData();
  }, [character.episode, character.origin.url, character.location.url]);

  const classes = useStyles();

  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  return (
    <Card className={classes.card} style={{ backgroundColor: color }}>
      <CardContent>
        <Typography variant="h6" component="h2">
          {character.name}
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
          {character.species} - {character.gender} - {character.status}
        </Typography>
      </CardContent>
      <CardActionArea className={classes.actionArea} onClick={() => {
                setPopoverOpen(!popoverOpen)
              }}>
        <CardMedia
          image={character.image}
          title={character.name}
          className={classes.media}
        />
        <div style={{ backgroundColor: color }} className={clsx(classes.overlay, {
          [classes.unhideOverlay]: popoverOpen,
        })}>
          <CardContent className={classes.infoOverlayBox}>
            <Typography variant="h6" component="h2">
              Episode Info:
            </Typography>
            <div className={classes.infoContentBox}>
              <Typography variant="body2" color="textPrimary" component="p">
              First seen: {firstEp?.name}
            </Typography>
              <Typography variant="body2" color="textPrimary" component="p">
                Last seen: {lastEp?.name}
              </Typography>
            </div>
            <Typography variant="h6" component="h2">
              Location Info:
            </Typography>
            <div className={classes.infoContentBox}>
              <Typography variant="body2" color="textPrimary" component="p">
                Origin: {origin?.name}
              </Typography>
              <Typography variant="body2" color="textPrimary" component="p">
                Current: {location?.name}
              </Typography>
            </div>
          </CardContent>
        </div>
      </CardActionArea>
      <CardActions>
        <Button size="small" onClick={() => {
          setPopoverOpen(!popoverOpen)
        }}>
          More deets
        </Button>
      </CardActions>
    </Card>
  );
}

export default CharaPage;
