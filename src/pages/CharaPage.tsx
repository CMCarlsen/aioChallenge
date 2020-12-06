import React from 'react';
import { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';

import CharacterCard from "../components/CharacterCard";
import { Info, Character} from "../services/CharacterService";

const baseUrl = 'https://rickandmortyapi.com/api/character/?page=1&name=rick&status=alive';

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
  }),
);

export const CharaPage = () => {
  const classes = useStyles(); // Use our CSS-in-JS styling from above.

  const [info, setInfo] = useState<Info>();
  const [results, setResults] = useState<Array<Character>>();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1); // TODO: Add pagination using this

  useEffect(() => {
    fetch(baseUrl)
     .then(resp => resp.json())
     .then(data => {
       setInfo(data.info);
       setResults(data.results);
     })
    }, [query, page]);

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
      <div>
        {results?.map(chara => <CharacterCard character={chara} />)}
      </div>
    </Container>
  );
}

export default CharaPage;
