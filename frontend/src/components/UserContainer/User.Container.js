import { Card, Checkbox, FormControlLabel } from '@material-ui/core';
import Humantic from './Humantic/Humantic';
import Recognition from './Recognition/Recognition'
import { useState } from 'react';
import UploadPdf from './UploadPdf/UploadPdf';
import { UserContainerStyles } from '../../styles/components/UserContainerStyles';

const UserContainer = () => {
  const classes = UserContainerStyles()
  const [checked, setChecked] = useState(false)

  return (
    <Card className={classes.root}>
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
