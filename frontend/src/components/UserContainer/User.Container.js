import { Card, Checkbox, FormControlLabel } from '@material-ui/core';
import Humantic from './Humantic/Humantic';
import { useHistory } from 'react-router-dom'
import Recognition from './Recognition/Recognition'
import { useState } from 'react';
import UploadPdf from './UploadPdf/UploadPdf';
import { UserContainerStyles } from '../../styles/components/UserContainerStyles';
import { GreenButton } from '../../styles/buttons';

const UserContainer = () => {
  const classes = UserContainerStyles()
  const [checked, setChecked] = useState(false)
  const history = useHistory()

  return (
    <Card className={classes.root}>
      <div className={classes.header_wrapper}>
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
        <GreenButton
          className={classes.admin_button}
          onClick={() => history.push('/admin_panel')}
        >
          Go to admin panel
        </GreenButton>
      </div>
      {checked ?
        <UploadPdf />
        :
        <div className={classes.container}>
          <Recognition />
          <Humantic />
        </div>
      }
    </Card>
  )
}

export default UserContainer;
