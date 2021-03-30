import { makeStyles } from '@material-ui/core/styles';

export const UserContainerStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    minWidth: '992px',
    width: '100%'
  },
  container: {
    display: 'flex',
    overflowY: 'auto',
    // height: '100vh',
    marginBottom: '10px',
    width: '100%',
  },
  checkbox: {
    marginLeft: '30px',
  },
}));
