import { Button, ListItem, Modal, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useHistory } from 'react-router'
import adminService from '../../services/adminService'
import HumanticResponse from '../UserContainer/Humantic/HumanticResponse/HumanticResponse'
import classes from './AdminPanel.module.scss'

const AdminPanel = () => {
  const history = useHistory()
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient()

  const linkedinCount = useQuery('linkedin-count', () => adminService.getLinkedinCount())
  const users = useQuery('users', () => adminService.getUsers())
  const analyzes = useMutation('analysis', userId => adminService.getUserRequestedAnalysis(userId))

  const metrics = useQuery('metrics', async () => {
    const algolia = await adminService.getMetrics({ service: 'algolia' })
    const humantic = await adminService.getMetrics({ service: 'humantic' })
    return { algolia, humantic }
  })

  const deleteUserMutation = useMutation(id => adminService.deleteUser(id), {
    onSuccess: () => queryClient.invalidateQueries('users')
  })

  const handleOpen = userId => {
    setOpen(true);
    analyzes.mutate(userId)
  }

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
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.data?.map(user =>
            <TableRow className={classes.user} key={user.id}>
              <TableCell>
                <ListItem className={classes.username} button onClick={() => handleOpen(user.id)}>
                  {user.username}
                </ListItem>
              </TableCell>
              <TableCell>
                <button onClick={() => deleteUserMutation.mutate(user.id)}>Remove</button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <h2 className={classes.metrics}>
        Metrics: algolia - {metrics.data?.algolia}, humantic - {metrics.data?.humantic}
      </h2>
      <h2>
        Amount of LinkedIn Profiles: {linkedinCount?.data}
      </h2>
      <Modal open={open} onClose={() => setOpen(false)} className={classes.modal}>
        <div className={classes.modal_container}>
          {analyzes.data?.map(analysis =>
            <HumanticResponse key={analysis._id} linkedinInfo={analysis.analysis} />
          )}
        </div>
      </Modal>
    </div>
  )
}

export default AdminPanel