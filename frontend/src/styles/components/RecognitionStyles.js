import { makeStyles } from '@material-ui/core/styles';

export const RecognitionStyles = makeStyles(() => ({
  record: {
    display: 'flex',
    flexDirection: 'column-reverse',
    maxWidth: '66.6%',
    height: '100%',
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
  record_wrapper: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    zIndex: '3',
  },
  recognition_spinner: {
    margin: '50px auto'
  },
  input_keyword: {
    margin: '4px 10px 0px 10px',
  },
  transcript_wrapper: {
    width: '26.5%',
  },
  recognition_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '73.5%',
  },
  recognition_content: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  transcript_content: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  content: {
    fontSize: '25px',
    display: 'flex',
    overflowY: 'hidden',
    width: '1070px',
    marginTop: '15px',
    height: '100%',
    flexDirection: 'row',
  }
}));
