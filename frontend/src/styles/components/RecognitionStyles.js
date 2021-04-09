import { makeStyles } from '@material-ui/core/styles';

export const RecognitionStyles = makeStyles(() => ({
  record: {
    width: '70%',
    marginLeft: 'auto',
  },
  headers: {
    display: 'flex',
    minHeight: '5%',
    margin: '0px',
    '& h1': {
      margin: '0'
    }
  },
  question_header: {
    width: '32.5%',
    textAlign: 'start',
  },
  answer_header: {
    width: '32.5%',
    textAlign: 'start',
  },
  transcript_header: {
    width: '35%',
    textAlign: 'start',
  },
  record_wrapper: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    zIndex: '3',
    minHeight: '7%',
    width: '100%',
    justifyContent: 'flex-start',
    '& button': {
      display: 'block',
      marginRight: '10px',
    },
    '& canvas': {
      width: '300px',
      margin: '10px 10px 10px 10px'
    },
  },
  recognition_spinner: {
    margin: '50px auto'
  },
  input_keyword: {
    margin: '4px 10px 0px 10px',
  },
  recognition_content: {
    display: 'flex',
    height: '88%',
    fontSize: '25px',
  },
  qa: {
    display: 'flex',
    flexDirection: 'column',
    width: '65%',
    overflowY: 'hidden',
  },
  transcript: {
    display: 'flex',
    flexDirection: 'column',
    width: '35%',
    overflowY: 'hidden',
  }
}));
