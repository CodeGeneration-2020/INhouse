import { Button, ListItem, Modal, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router'
import adminService from '../../services/adminService/adminService'
import userService from '../../services/userService/userService'
import HumanticResponse from '../UserContainer/Humantic/HumanticResponse/HumanticResponse'
import classes from './AdminPanel.module.scss'

const AdminPanel = () => {
  const history = useHistory()
  const [open, setOpen] = React.useState(false);

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

  const deleteUserHandler = id => deleteUserMutation.mutate(id)

  useEffect(() => {
    mutate()
  }, [mutate])

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
      {data &&
        <>
          <h2>Users</h2>
          <Table>
            <TableHead className={classes.head}>
              <TableCell>Username</TableCell>
              <TableCell>Action</TableCell>
            </TableHead>
            <TableBody>
              {data.users.map(user =>
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
            Metrics: algolia - {data.algoliaMetrics}, humantic - {data.humanticMetrics}
          </h2>
          <h2>
            Amount of LinkedIn Profiles: {data.linkedinCount}
          </h2>
        </>
      }
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
