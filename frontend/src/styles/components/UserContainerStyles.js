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
    width: '100%',
    background: 'white',
    height: '100%',
  },
  switch: {
    height: '7%',
  },
  checkbox: {
    marginLeft: '30px',
  },
  admin_button: {
    margin: '5px 10px 10px',
  },
  container: {
    position: 'relative',
    height: '93%',
    width: '100%',
    minWidth: '1024px',
  },
  gradient: {
    position: 'absolute',
    zIndex: '2',
    right: '0',
    bottom: '0',
    left: '100',
    width: '71%',
    height: '60%', 
    background: 'linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 50%)',
  },  
}));
