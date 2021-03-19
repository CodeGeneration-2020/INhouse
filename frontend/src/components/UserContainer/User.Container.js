import { Card } from '@material-ui/core';
import Feedback from './Feedback/Feedback';
import Humantic from './Humantic/Humantic';
import Recognition from './Recognition/Recocnition'
// import classes from './User.module.scss';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '600px',
    border: 'solid',
  },
}));

const UserContainer = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Humantic />
      <Feedback />
      <Recognition />
    </Card>
  )
}

export default UserContainer;
