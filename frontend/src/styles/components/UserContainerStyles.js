import { makeStyles } from '@material-ui/core/styles';

export const UserContainerStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    minWidth: '992px',
    width: '100%'
  },
  content: {
    display: 'flex',
    overflowY: 'auto',
    height: '100vh',
    width: '100%',
    background: 'white',
  },
  checkbox: {
    marginLeft: '30px',
  },
  admin_button: {
    margin: '5px 10px 10px',
  },
  container: {
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    zIndex: '2',
    right: '0',
    bottom: '0',
    left: '0',
    height: '70%', 
    background: 'linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 50%)',
  },
  headers: {
    display: 'flex',
    justifyContent: 'space-around',
    height: '10%',
    width: '100%'
  },
  
}));
