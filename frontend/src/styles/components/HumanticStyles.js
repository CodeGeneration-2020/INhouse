import { makeStyles } from '@material-ui/core/styles';

export const HumanticStyles = makeStyles(() => ({
  humantic: {
    display: 'flex',
    flexDirection: 'column',
    width: '28%',
    minHeight: '100%',
  },
  button: {
    marginLeft: '20px',
  },
  header: {
    width: '100%',
    minHeight: '5%',
    margin: '0',
    textAlign: 'center',
  },
  url: {
    minHeight: '7%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  humantic_spinner: {
    marginTop: '50px',
    marginBottom: 'auto',
    marginRight: '150px',
  },
  danger: {
    color: 'red',
    marginRight: '150px',
  },
  response_wrapper: {
    minHeight: '88%',
    wordWrap: 'break-word',
    overflowX: 'hidden',
    padding: '0 20px',
  }
}));
