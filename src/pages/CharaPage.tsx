import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Grid from '@material-ui/core/Grid';

import CharacterCard from '../components/CharacterCard';
import { Info, Character, SearchParameters } from '../services/CharacterService';
import { buildUrl, fetchCharacterList } from '../services/CharacterService';
import SearchBar from '../components/SearchBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: theme.palette.secondary.light,
      color: '#000',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'auto',
    },
    explanationContainer: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.primary.dark,
      [theme.breakpoints.down(600)]: {
        padding: '0px 20px 10px',
      },
      [theme.breakpoints.up(600)]: {
        padding: '0px 60px 20px',
      },
    },
    explanationHeader: {
      display: 'flex',
      justifyContent: 'center',
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
      marginTop: '20px',
      height: '100%',
    },
    characterCardContainer: {
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      [theme.breakpoints.down(600)]: {
        justifyContent: 'center',
      },
      [theme.breakpoints.up(600)]: {
        justifyContent: 'left',
      },
    },
    pageScrollArrowDiv: {
      margin: '15vh 5px',
      minWidth: '50px',
      maxWidth: '50px',
      '&:hover': {
        backgroundColor: fade(theme.palette.primary.dark, 0.5),
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
    },
    hidden: {
      visibility: 'hidden',
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

  const prevPageClick = () => {
    if(info?.prev){
      setPage(page-1);
    }
  }

  const nextPageClick = () => {
    if(info?.next){
      setPage(page+1);
    }
  }

  const handleNewSearch = (searchParams: Partial<SearchParameters>) => {
    setPage(1);
    setSearchParams(searchParams)
  }

  return (
    <div className={classes.container}>
      <div className={classes.explanationContainer}>
        <h1 className={classes.explanationHeader}>RnM API</h1>
        <SearchBar doSearch={handleNewSearch} />
      </div>
      <div className={classes.contentContainer}>
        <div onClick={prevPageClick} className={clsx(classes.pageScrollArrowDiv,{
          [classes.hidden]: !info?.prev
        })}>
          <KeyboardArrowLeftIcon className={classes.pageScrollArrow} fontSize='large' />
        </div>
        <Grid container spacing={1}
              className={classes.characterCardContainer}>
          {results?.map(chara =>
            <Grid item xs={12} sm={6} md={3} lg={3} key={chara.id}>
              <CharacterCard character={chara} />
            </Grid>
          )}
        </Grid>
        <div onClick={nextPageClick} className={clsx(classes.pageScrollArrowDiv,{
          [classes.hidden]: !info?.next
        })}>
          <KeyboardArrowRightIcon className={classes.pageScrollArrow} fontSize='large' />
        </div>
      </div>
    </div>
  );
}

export default CharaPage;
