import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, TextField, MenuItem, Button } from "@material-ui/core";
import {Clear, Search} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBarPaper: {
      margin: '0px 5px',
      padding: theme.spacing(2),
      [theme.breakpoints.up(600)]: {
        padding: theme.spacing(1),
      },
      minWidth: '150px',
    },
    layout: {
      [theme.breakpoints.down(600)]: {
        width: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      [theme.breakpoints.up(600)]: {
        width: 450,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      [theme.breakpoints.up(900)]: {
        width: 750,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      [theme.breakpoints.up(1200)]: {
        width: 900,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    buttonMargin: {
      marginRight: '8px',
    }
  }),
);

interface Droplist {
  value: string | undefined,
  label: string,
}

interface StyledInputProps {
  labelText: string,
  currentVal: string | undefined,
  changeHandler: Function,
  specialKeyHandler?: Function,
  droplistOptions?: Array<Droplist>,
}

const characterStatuses = [
  {
    value: '',
    label: '',
  },
  {
    value: 'alive',
    label: 'Alive'
  },
  {
    value: 'dead',
    label: 'Dead'
  },
  {
    value: 'unknown',
    label: 'Unknown'
  },
];

const characterGenders = [
  {
    value: '',
    label: '',
  },
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'genderless',
    label: 'Genderless',
  },
  {
    value: 'unknown',
    label: 'Unknown',
  },
];

const StyledInput = ({ labelText, currentVal, changeHandler, specialKeyHandler, droplistOptions }: StyledInputProps) => {
  return (
    <TextField
      id={`outlined-input-${labelText.toLocaleLowerCase()}`}
      label={labelText}
      value={currentVal}
      onChange={e => changeHandler(e.target.value)}
      variant='outlined'
      size='small'
      color='secondary'
      fullWidth
      select={droplistOptions ? true : false}
      onKeyDown={specialKeyHandler ? e => specialKeyHandler(e) : undefined}
    >
      {droplistOptions?.map((option) => (
        <MenuItem key={`drop-option-${labelText.toLocaleLowerCase()}-${option.label.toLocaleLowerCase()}`}
                  value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

const SearchBar = ({ doSearch }: { doSearch: Function }) => {
  const classes = useStyles();

  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [species, setSpecies] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  const resetClicked = () => {
    setName('');
    setStatus('');
    setSpecies('');
    setType('');
    setGender('');
  }

  const searchClicked = () => {
    doSearch({ name, status, species, type, gender });
  }

  const handleEnterKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      searchClicked();
    }
  }

  return (
    <main className={classes.layout}>
      <Paper className={classes.searchBarPaper}>
        <Grid container spacing={1} justify='flex-end'>
          <Grid item xs={5} sm={4} md={4}>
            <StyledInput labelText='Name' currentVal={name} changeHandler={setName}
                         specialKeyHandler={handleEnterKey} />
          </Grid>
          <Grid item xs={4} sm={4} md={2}>
            <StyledInput labelText='Species' currentVal={species} changeHandler={setSpecies}
                         specialKeyHandler={handleEnterKey} />
          </Grid>
          <Grid item xs={3} sm={4} md={2}>
            <StyledInput labelText='Type' currentVal={type} changeHandler={setType}
                         specialKeyHandler={handleEnterKey} />
          </Grid>
          <Grid item xs={6} sm={6} md={2}>
            <StyledInput labelText='Status' currentVal={status} changeHandler={setStatus}
                         droplistOptions={characterStatuses} specialKeyHandler={handleEnterKey} />
          </Grid>
          <Grid item xs={6} sm={6} md={2}>
            <StyledInput labelText='Gender' currentVal={gender} changeHandler={setGender}
                         droplistOptions={characterGenders} specialKeyHandler={handleEnterKey} />
          </Grid>
          <Grid item >
            <Button
              variant='contained'
              color='primary'
              startIcon={<Clear />}
              size='medium'
              onClick={() => resetClicked()}
              className={classes.buttonMargin}
            >
              Clear
            </Button>
            <Button
              variant='contained'
              color='secondary'
              startIcon={<Search />}
              size='medium'
              onClick={() => searchClicked()}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
}

export default SearchBar;
