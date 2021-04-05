import { makeStyles } from '@material-ui/core/styles';

export const HumanticStyles = makeStyles(() => ({
  humantic: {
    display: 'flex',
    marginLeft: '20px',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    minHeight: '83%',
    width: '33.3%',
  },
  button: {
    marginLeft: '20px',
  },
  url: {
    marginBottom: '170px',
  },
  humantic_spinner: {
    marginTop: '40px',
    marginRight: '125px',
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

