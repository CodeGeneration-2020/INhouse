import { Button, ListItem } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'
import classes from './AdminPanel.module.scss'

const AdminPanel = () => {
  const history = useHistory()

  return (
    <div className={classes.admin_panel}>
      <h1>Admin panel</h1>
      <div className={classes.user_title}>
        <h2>Users</h2>
        <Button variant="contained" color="primary" onClick={() => history.push('/add_user')}>
          Add user
        </Button>
      </div>
      <ListItem className={classes.user} button>user1</ListItem>
      <h2>Metrics: </h2>
      <h2>Amount of LinkedIn Profiles: </h2>
    </div>
  )
}

export default AdminPanel
