import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth:'125px',
      margin: '0px 5px 10px',
      backgroundColor: theme.palette.primary.dark,
    },
  }),
);

const SearchBar = ({ doSearch }: { doSearch: Function }) => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [status, setStatus] = useState<'alive'|'dead'|'unknown'|null>(null);
  const [species, setSpecies] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState<'male'|'female'|'genderless'|'unknown'|null>(null);

  function searchClicked() {
    doSearch(name, status, species, type, gender);
  }

  return (
    <div>
      <button onClick={() => searchClicked()}>Search</button>
    </div>
  );
}

export default SearchBar;
