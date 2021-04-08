import { makeStyles } from '@material-ui/core/styles';

export const HumanticStyles = makeStyles(() => ({
  humantic: {
    display: 'flex',
    marginLeft: '20px',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    height: '100%',
  },
  button: {
    marginLeft: '20px',
  },
  url: {
    marginBottom: '11px',
    marginRight: '40px',
    display: 'flex',
    justifyContent: 'center',
    width: '550px',
    maxWidth: '550px',
  },
  humantic_spinner: {
    marginTop: '50px',
    marginBottom: 'auto',
    marginRight: '150px',
  },
  danger: {
    marginTop: '50px',
    marginBottom: 'auto',
    color: 'red',
    marginRight: '150px',
  },
  response_wrapper: {
    maxHeight: '700px',
    alignSelf: 'flex-start',
    marginBottom: 'auto',
    maxWidth: '550px',
  }
}));

