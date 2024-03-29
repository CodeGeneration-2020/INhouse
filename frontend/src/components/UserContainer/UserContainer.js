import { Card, Checkbox, CircularProgress, FormControlLabel } from '@material-ui/core';
import Humantic from './Humantic/Humantic';
import { useHistory } from 'react-router-dom'
import Recognition from './Recognition/Recognition'
import { useState } from 'react';
import UploadPdf from './UploadPdf/UploadPdf';
import { UserContainerStyles } from '../../styles/components/UserContainerStyles';
import { GreenButton } from '../../styles/buttons';
import { useMutation, useQuery } from 'react-query';
import authService from '../../services/authService';
import { pageSpinnerStyles } from '../../styles/pageSpinnerStyles';
import userService from '../../services/userService';

const UserContainer = () => {
  const spinnerClasses = pageSpinnerStyles()
  const classes = UserContainerStyles()
  const [checked, setChecked] = useState(false)
  const history = useHistory()
  const mutationHumantic = useMutation(linkedInUrl => userService.createHumantic(linkedInUrl))
  
  const { data, isLoading } = useQuery('role', () => authService.roleCheck())
  if (isLoading) return <CircularProgress className={spinnerClasses.route_spinner} />

  return (
    <Card className={classes.root}>
      <div className={classes.switch}>
        <FormControlLabel
          className={classes.checkbox}
          label="Im a customer"
          control={
            <Checkbox
              checked={checked}
              onChange={() => setChecked(!checked)}
              color="primary"
            />
          }
        />
        {data.role === 'ADMIN' &&
          <GreenButton className={classes.admin_button} onClick={() => history.push('/admin_panel')}>
            Go to admin panel
          </GreenButton>
        }
      </div>
      {checked ?
        <UploadPdf />
        :
        <div className={classes.container}>
          <div className={classes.content}>
            <Humantic mutationHumantic={mutationHumantic} />
            <Recognition mutationHumantic={mutationHumantic} />
          </div>
          <div className={classes.gradient}></div>
        </div>
      }
    </Card>
  )
}

export default UserContainer;
