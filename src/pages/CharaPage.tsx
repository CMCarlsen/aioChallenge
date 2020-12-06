import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';

import CharacterCard from "../components/CharacterCard";
import { Info, Character } from "../services/CharacterService";

const baseUrl = 'https://rickandmortyapi.com/api/character/';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: '#aaa',
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
    },
    explanationHeader: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '5px',
    },
    explanationText: {
      display: 'flex',
      justifyContent: 'center'
    },
    containerContainer: {
      overflow: 'auto',
      alignItems: 'center',
    },
    characterCardContainer: {
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  }),
);

export const CharaPage = () => {
  const classes = useStyles(); // Use our CSS-in-JS styling from above.

  const [info, setInfo] = useState<Info>();
  const [results, setResults] = useState<Array<Character>>();

  const [name, setName] = useState('');
  const [status, setStatus] = useState<'alive'|'dead'|'unknown'|null>(null);  // alive, dead or unknown
  const [species, setSpecies] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState<'male'|'female'|'genderless'|'unknown'|null>(null); // female, male, genderless or unknown

  const [page, setPage] = useState(1); // TODO: Add pagination using this

  useEffect(() => {
    fetch(baseUrl)
     .then(resp => resp.json())
     .then(data => {
       setInfo(data.info);
       setResults(data.results);
     });
    }, [name, status, species, type, gender, page]);

  if(info)
    console.log(info);
  if(results)
    console.log(results);

  return (
    <Container className={classes.container} maxWidth={false}>
      <div className={classes.explanationContainer}>
        <h1 className={classes.explanationHeader}>Character Explanation Header</h1>
        <p className={classes.explanationText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at accumsan tortor.
          Nullam eleifend in nisl et cursus. Aliquam a tortor vitae nisi gravida faucibus. Sed leo elit, mattis eu. </p>
      </div>
      <div className={classes.containerContainer}>
        <div className={classes.characterCardContainer}>
          {results?.map(chara => <CharacterCard character={chara} />)}
        </div>
      </div>
    </Container>
  );
}

export default CharaPage;
