import { FormControl, InputLabel, NativeSelect } from '@material-ui/core'
import React from 'react'
import { useQuery } from 'react-query'
import adminService from '../../services/adminService'
import { SelectStyles } from '../../styles/components/SelectStyles'

const Select = ({ state, selectHandler }) => {
  const classes = SelectStyles()

  const users = useQuery("users", () => adminService.getUsers());

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink htmlFor="user">Related user</InputLabel>
      <NativeSelect
        value={state}
        onChange={selectHandler}
        inputProps={{ name: 'relatedTo', id: 'user' }}
      >
        <option value={''}>None</option>
        {users.data?.map(user => <option key={user.id} value={user.id}>{user.username}</option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default Select
