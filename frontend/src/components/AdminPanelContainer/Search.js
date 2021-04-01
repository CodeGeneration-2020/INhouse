import { IconButton, InputBase, makeStyles, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import React from 'react'

const searchStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    marginBottom: '20px'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const Search = ({ inputEl, searchHandler, clearSearchHandler }) => {
  const classes = searchStyles()

  return (
    <Paper className={classes.root}>
      <InputBase className={classes.input} placeholder="Search User" inputRef={inputEl}/>
      <IconButton className={classes.iconButton} onClick={searchHandler}><SearchIcon /></IconButton>
      <IconButton onClick={clearSearchHandler}><ClearIcon /></IconButton>
    </Paper>
  )
}

export default Search
