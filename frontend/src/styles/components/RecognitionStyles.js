import { makeStyles } from '@material-ui/core/styles';

export const RecognitionStyles = makeStyles(() => ({
  record: {
    display: 'flex',
    flexDirection: 'column-reverse',
    maxWidth: '66.6%',
    height: '83%',
    justifyContent: 'space-between',
    '& button': {
      display: 'block',
      marginRight: '10px',
    },
    '& canvas': {
      width: '300px',
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
  input_keyword: {
    margin: '4px 10px 0px 10px',
  }
}));
