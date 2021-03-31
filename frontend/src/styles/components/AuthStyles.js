import { makeStyles } from '@material-ui/core/styles';

export const AuthStyles = makeStyles(() => ({
  login: {
    display: 'flex',
    textDecoration: 'none',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    width: '500px',
    height: '500px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '5px 5px 5px gray'
  },
  wrapper: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  textfield: {
    height: '70px',
    width: '200px',
  },
  authBtn: {
    fontSize: '20px',
    margin: '30px 0px',
  },
  login_link: {
    fontSize: '20px',
    marginTop: '20px',
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    }
  },
}));
