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
    background: 'linear-gradient(transparent 45%, white 50%, rgb(255, 255, 144, 0) 50%)',
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
    background: 'url(data:image/svg+xml;base64,alotofcodehere)',
    background: '-moz-linear-gradient(top,  rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%)',
    background: '-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,0)), color-stop(70%,rgba(255,255,255,1)))',
    background: '-webkit-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 70%)',
    background: '-o-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 70%)',
    background: '-ms-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 70%)',
    background: 'linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 70%)',
  }
}));
