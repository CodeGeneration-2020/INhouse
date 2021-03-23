import { Card } from '@material-ui/core';
import Humantic from './Humantic/Humantic';
import Recognition from './Recognition/Recocnition'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100vh',
  },
}));

const UserContainer = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Recognition />
      <Humantic />
    </Card>
  )
}

export default UserContainer;
