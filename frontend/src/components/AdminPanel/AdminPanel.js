import { Button, ListItem, TableBody } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router'
import adminService from '../../services/adminService/adminService'
import classes from './AdminPanel.module.scss'

const AdminPanel = () => {
  const history = useHistory()

  const { data, mutate } = useMutation(async () => {
    const algoliaMetrics = await adminService.getMetrics({ service: 'algolia' })
    const humanticMetrics = await adminService.getMetrics({ service: 'humantic' })
    const linkedinCount = await adminService.getLinkedinCount()
    const users = await adminService.getUsers() || []
    return { algoliaMetrics, humanticMetrics, linkedinCount, users }
  })

  const deleteUserMutation = useMutation(id => adminService.deleteUser(id), {
    onSuccess: () => mutate()
  })

  const deleteUserBtn = id => deleteUserMutation.mutate(id)

  useEffect(() => {
    mutate()
  }, [mutate])

  return (
    <div className={classes.admin_panel}>
      <h1>Admin panel</h1>
      {data &&
        <>
          <TableBody>
            <div className={classes.user_title}>
              <h2>Users</h2>
              <Button variant="contained" color="primary" onClick={() => history.push('/add_user')}>
                Add user
              </Button>
            </div>
            {data.users.map(user =>
              <div key={user.id} className={classes.user}>
                <ListItem className={classes.username} button>
                  {user.username}
                </ListItem>
                <button onClick={() => deleteUserBtn(user.id)}>
                  Remove
                </button>
              </div>
            )}
          </TableBody>
          <h2 className={classes.metrics}>
            Metrics: algolia - {data.algoliaMetrics}, humantic - {data.humanticMetrics}
          </h2>
          <h2>
            Amount of LinkedIn Profiles: {data.linkedinCount}
          </h2>
        </>
      }
    </div>
  )
}

export default AdminPanel
