import { Card, Checkbox, FormControlLabel } from '@material-ui/core';
import Humantic from './Humantic/Humantic';
import Recognition from './Recognition/Recocnition'
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import UploadPdf from './UploadPdf/UploadPdf';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    minWidth: '992px',
    width: '100%'
  },
  container: {
    display: 'flex',
    height: '100vh',
    width: '100%',
  },
  checkbox: {
    marginLeft: '30px',
  },
}));

const UserContainer = () => {
  const classes = useStyles();
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
