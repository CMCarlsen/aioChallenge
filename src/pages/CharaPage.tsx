import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Grid from '@material-ui/core/Grid';

import CharacterCard from "../components/CharacterCard";
import { Info, Character, SearchParameters } from "../services/CharacterService";
import { buildUrl, fetchCharacterList } from "../services/CharacterService";
import SearchBar from "../components/SearchBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: theme.palette.primary.light,
      color: '#000',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      paddingTop: theme.spacing(0.1),
      paddingBottom: theme.spacing(0.5),
      overflow: 'auto',
    },
    explanationContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: '0px 100px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    explanationHeader: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '5px',
    },
    explanationText: {
      display: 'flex',
      justifyContent: 'center',
      margin: 0,
    },
    contentContainer: {
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'row',
    },
    characterCardContainer: {
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: 0,
    },
    pageScrollArrowDiv: {
      margin: '15vh 5px',
      minWidth: '50px',
      maxWidth: '50px',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark
      },
      position: 'relative',
    },
    pageScrollArrow: {
      width: '50px',
      height: '50px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    }
  }),
);

export const CharaPage = () => {
  const classes = useStyles(); // Use our CSS-in-JS styling from above.

  const [searchParams, setSearchParams] = useState<Partial<SearchParameters>>({});
  const [info, setInfo] = useState<Info>();
  const [results, setResults] = useState<Array<Character>>();
  const [page, setPage] = useState(1); // TODO: Add pagination using this

  useEffect(() => {
    // Typescript hack for useEffect
    // https://medium.com/javascript-in-plain-english/how-to-use-async-function-in-react-hook-useeffect-typescript-js-6204a788a435
    async function searchOnChanges() {
      const urlToSearch = buildUrl(page, searchParams);
      const newCharList = await fetchCharacterList(urlToSearch);
      const { info, characterList } = newCharList;
      setInfo(info);
      setResults(characterList);
    }

    searchOnChanges();
  }, [searchParams, page]);

  return (
    <div className={classes.container}>
      <div className={classes.explanationContainer}>
        <h1 className={classes.explanationHeader}>RnM API</h1>
        <p className={classes.explanationText}>Wubba Lubba Dub Dub</p>
        <SearchBar doSearch={setSearchParams} />
      </div>
      <div className={classes.contentContainer}>
        <div className={classes.pageScrollArrowDiv}>
          <KeyboardArrowLeftIcon className={classes.pageScrollArrow} fontSize='large' />
        </div>
        <Grid container direction='row' justify="center" alignItems="center" spacing={1}
              className={classes.characterCardContainer}>
          {results?.map(chara =>
            <Grid item xs={7} sm={4} md={3} lg={2} key={chara.id}>
              <CharacterCard character={chara} />
            </Grid>
          )}
        </Grid>
        <div className={classes.pageScrollArrowDiv}>
          <KeyboardArrowRightIcon className={classes.pageScrollArrow} fontSize='large' />
        </div>
      </div>
    </div>
  );
}

export default CharaPage;
