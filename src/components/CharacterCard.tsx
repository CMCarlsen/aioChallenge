import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, CardContent, CardActions, Typography, Button } from '@material-ui/core/';
import { Info } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDizzy } from "@fortawesome/free-regular-svg-icons";
import { faLaughWink } from "@fortawesome/free-regular-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

import { Character } from '../services/CharacterService';
import { Location, fetchLocationData } from "../services/LocationService";
import { Episode, fetchEpisodeData } from "../services/EpisodeService";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionArea: {
      transition: '0.2s',
    },
    actionAreaHover:{
      "&:hover $focusHighlight": {
        opacity: 0.2,
      }
    },
    focusHighlight: {},
    card: {
      minWidth: '125px',
      margin: '0px 5px 10px',
      backgroundColor: theme.palette.primary.dark,
    },
    media: {
      height: 0,
      paddingTop: '80%',
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
    whiteFont: {
      color: '#fdfdfd',
    },
    // https://css-tricks.com/flexbox-truncated-text/
    cardHeaderContent: {
      minWidth: 0,
    },
    fontOverflow: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    flexAndCenter: {
      display: 'flex',
      alignItems: 'center',
    },
    statusIcon: {
      fontSize: '20px',
      marginLeft: '5px',
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

  let statusIcon;
  switch (character.status.toLocaleLowerCase()) {
    case 'alive':
      statusIcon = faLaughWink;
      break;
    case 'dead':
      statusIcon = faDizzy;
      break;
    default:
      statusIcon = faQuestionCircle;
  }

  return (
    <Card className={classes.card} style={{ backgroundColor: color }}>
      <CardContent>
        <Typography variant="h6" component="h2" className={clsx(classes.whiteFont, classes.fontOverflow)}>
          {character.name}
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p" className={classes.whiteFont}>
          {character.species.charAt(0).toUpperCase() + character.species.slice(1)
          } - {character.gender.charAt(0).toUpperCase() + character.gender.slice(1)}
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p" className={clsx(classes.whiteFont, classes.flexAndCenter)}>
          {character.status.charAt(0).toUpperCase() + character.status.slice(1)}
          <FontAwesomeIcon icon={statusIcon} className={classes.statusIcon}/>
        </Typography>
      </CardContent>
      <CardActionArea className={classes.actionArea}
        classes={{ root: classes.actionAreaHover, focusHighlight: classes.focusHighlight }}
        onClick={() => {
          setPopoverOpen(!popoverOpen)
        }}
      >
        <CardMedia
          image={character.image}
          title={character.name}
          className={classes.media}
        />
        <div style={{ backgroundColor: color }} className={clsx(classes.overlay, {
          [classes.unhideOverlay]: popoverOpen,
        })}>
          <CardContent className={classes.infoOverlayBox}>
            <Typography variant="h6" component="h2" className={classes.whiteFont}>
              Episode Info:
            </Typography>
            <div className={classes.infoContentBox}>
              <Typography variant="body2" color="textPrimary" component="p" className={classes.whiteFont}>
              First seen: {firstEp?.name}
            </Typography>
              <Typography variant="body2" color="textPrimary" component="p" className={classes.whiteFont}>
                Last seen: {lastEp?.name}
              </Typography>
            </div>
            <Typography variant="h6" component="h2" className={classes.whiteFont}>
              Location Info:
            </Typography>
            <div className={classes.infoContentBox}>
              <Typography variant="body2" color="textPrimary" component="p" className={classes.whiteFont}>
                Origin: {origin?.name}
              </Typography>
              <Typography variant="body2" color="textPrimary" component="p" className={classes.whiteFont}>
                Current: {location?.name}
              </Typography>
            </div>
          </CardContent>
        </div>
      </CardActionArea>
      <CardActions>
        <Button
          variant='contained'
          size='small'
          color='primary'
          startIcon={<Info />}
          onClick={() => {
          setPopoverOpen(!popoverOpen)
        }}>
          More deets
        </Button>
      </CardActions>
    </Card>
  );
}

export default CharaPage;
