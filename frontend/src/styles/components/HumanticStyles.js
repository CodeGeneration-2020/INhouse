import { makeStyles } from '@material-ui/core/styles';

export const HumanticStyles = makeStyles(() => ({
  humantic: {
    display: 'flex',
    marginLeft: '20px',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    height: '83%',
    width: '33.3%',
  },
  button: {
    marginLeft: '20px',
  },
  url: {
    position: 'absolute',
    zIndex: '3',
    marginBottom: '10px',
  },
  humantic_spinner: {
    marginTop: '40px',
    marginRight: '125px',
  },
  analyzes_wrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column-reverse',
  },
  danger: {
    marginTop: '50px',
    color: 'red',
    marginRight: '130px',
  },
  humantic_content: {
    marginBottom: 'auto',
  }
}));

