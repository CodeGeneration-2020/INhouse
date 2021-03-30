import { makeStyles } from '@material-ui/core/styles';

export const HumanticStyles = makeStyles(() => ({
  humantic: {
    display: 'flex',
    marginLeft: '20px',
    textOverflow: 'hidden',
    textDecoration: 'none',
    flexDirection: 'column',
    alignItems: 'center',
    width: '33.3%',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    button: {
      marginTop: '10px',
      marginLeft: '20px',
    },
    humantic_spinner: {
      marginTop: '40px',
    },
  },
  analyzes_wrapper: {
    display: 'flex',
    flexDirection: 'column-reverse',  
  }
}));

