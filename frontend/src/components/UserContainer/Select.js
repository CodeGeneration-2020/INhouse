import { FormControl, InputLabel, NativeSelect } from '@material-ui/core'
import React from 'react'
import { SelectStyles } from '../../styles/components/SelectStyles'

const Select = ({ state, selectHandler }) => {
  const classes = SelectStyles()

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink htmlFor="user">Related user</InputLabel>
      <NativeSelect
        value={state}
        onChange={selectHandler}
        inputProps={{ name: 'Username', id: 'user' }}
      >
        <option value={false}>None</option>
        <option value={10}>elon</option>
        <option value={20}>steve</option>
        <option value={30}>jeff</option>
      </NativeSelect>
    </FormControl>
  )
}

export default Select
