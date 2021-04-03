import { makeStyles } from '@material-ui/core/styles';

export const RecognitionStyles = makeStyles(() => ({
  record: {
    display: 'flex',
    flexDirection: 'column-reverse',
    width: '66.6%',
    height: '80%',
    justifyContent: 'space-between',
    minWidth: '1000px',
    '& button': {
      display: 'block',
      marginRight: '10px',
    },
    '& canvas': {
      maxWidth: '300px',
      margin: '10px 10px 0px 10px'
    },
  },
  audio: {
    paddingRight: '30px',
    outline: 'none',
  },
  record_wrapper: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    zIndex: '3',
  },

  recognition_spinner: {
    margin: '50px auto'
  },
  recognition_rows: {
    display: 'flex',
    flexDirection: 'column-reverse',
    marginBottom: 'auto'
  },
}));
