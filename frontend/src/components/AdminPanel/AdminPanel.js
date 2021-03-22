import { Button, ListItem, Modal, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useHistory } from 'react-router'
import adminService from '../../services/adminService'
import userService from '../../services/userService'
import HumanticResponse from '../UserContainer/Humantic/HumanticResponse/HumanticResponse'
import classes from './AdminPanel.module.scss'

const AdminPanel = () => {
  const history = useHistory()
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient()

  const linkedinCount = useQuery('linkedin-count', () => adminService.getLinkedinCount())
  const users = useQuery('users', () => adminService.getUsers())
  
  const metrics = useQuery('metrics', async () => {
    const algolia = await adminService.getMetrics({ service: 'algolia' })
    const humantic = await adminService.getMetrics({ service: 'humantic' })
    return { algolia, humantic }
  })

  const deleteUserMutation = useMutation(id => adminService.deleteUser(id), {
    onSuccess: () => queryClient.invalidateQueries('users')
  })

  const deleteUserHandler = id => deleteUserMutation.mutate(id)
  const mutationHumantic = useMutation(() => userService.createHumantic('https://www.linkedin.com/in/oleksii-samoilenko-a54940167'))

  const handleOpen = () => {
    mutationHumantic.mutate()
    setOpen(true);
  };

  return (
    <div className={classes.admin_panel}>
      <h1>Admin panel</h1>
      <Button className={classes.add_user} variant="contained" color="primary"
        onClick={() => history.push('/add_user')}>
        Add user
      </Button>
      <h2>Users</h2>
      <Table>
        <TableHead className={classes.head}>
          <TableCell>Username</TableCell>
          <TableCell>Action</TableCell>
        </TableHead>
        <TableBody>
          {users.data && users.data.map(user =>
            <TableRow className={classes.user} key={user.id}>
              <TableCell>
                <ListItem className={classes.username} button onClick={handleOpen}>
                  {user.username}
                </ListItem>
              </TableCell>
              <TableCell>
                <button onClick={() => deleteUserHandler(user.id)}>
                  Remove
                </button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <h2 className={classes.metrics}>
        {metrics.data &&
          `Metrics: algolia - ${metrics.data.algolia}, humantic - ${metrics.data.humantic}`
        }
      </h2>
      <h2>
        {linkedinCount.data && `Amount of LinkedIn Profiles: ${linkedinCount.data}`}
      </h2>
      {mutationHumantic.data &&
        <Modal open={open} onClose={() => setOpen(false)} className={classes.modal}>
          <div className={classes.modal_container}>
            <HumanticResponse linkedinInfo={mutationHumantic.data} />
            <HumanticResponse linkedinInfo={mutationHumantic.data} />
          </div>
        </Modal>
      }
    </div>
  )
}

export default AdminPanel
