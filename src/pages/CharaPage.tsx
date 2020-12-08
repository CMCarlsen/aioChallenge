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
      backgroundImage: `linear-gradient(180deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
      color: '#000',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
    },
    bannerContainer: {
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
    bannerHeader: {
      display: 'flex',
      justifyContent: 'center',
      fontFamily: '"East Sea Dokdo", monospace',
      margin: '0px',
      textShadow: `1px 1px 8px ${theme.palette.secondary.main}, 1px 1px 10px #ccc`,
      [theme.breakpoints.down(660)]: {
        fontSize: '40px',
      },
      [theme.breakpoints.up(661)]: {
        fontSize: '60px',
      },
    },
    bannerSubheader: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '0px',
      marginBottom: '10px',
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    characterCardContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      [theme.breakpoints.down(600)]: {
        justifyContent: 'center',
        margin: '10px 0px 0px',
      },
      [theme.breakpoints.up(600)]: {
        justifyContent: 'left',
        margin: '10px 10px 0px',
      },
    },
    pageScrollArrowDiv: {
      margin: '0 5px',
      height: '300px',
      minWidth: '50px',
      maxWidth: '50px',
      backgroundColor: fade(theme.palette.primary.dark, 0.2),
      '&:hover': {
        backgroundColor: fade(theme.palette.primary.dark, 0.5),
      },
      position: 'sticky',
      '@media (max-height: 600px)':{
        top: '20vh',
      },
      '@media (min-height: 600px)':{
        top: '40vh',
      },
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
  const [page, setPage] = useState(1);

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
      <div className={classes.bannerContainer}>
        <div>
          <p className={classes.bannerHeader}>Rick and Morty API Browser</p>
          <p className={classes.bannerSubheader}>“What is my purpose?” "Serving API data" "Oh my God"</p>
        </div>
        <SearchBar doSearch={handleNewSearch} />
      </div>
      <div className={classes.contentContainer}>
        <div onClick={prevPageClick} className={clsx(classes.pageScrollArrowDiv,{
          [classes.hidden]: !info?.prev
        })}>
          <KeyboardArrowLeftIcon className={classes.pageScrollArrow} fontSize='large' />
        </div>
        <Grid container spacing={2}
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
