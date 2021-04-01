import { IconButton, InputBase, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import React from 'react'
import { searchStyles } from '../../styles/components/SearchStyles';

const Search = ({ inputEl, searchHandler, clearSearchHandler }) => {
  const classes = searchStyles()

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search User"
        inputRef={inputEl}
      />
      <IconButton onClick={searchHandler}><SearchIcon /></IconButton>
      <IconButton onClick={clearSearchHandler}><ClearIcon /></IconButton>
    </Paper>
  )
}

export default Search
