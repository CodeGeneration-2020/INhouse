

import { makeStyles } from '@material-ui/core/styles';

export const RecognitionRowStyles = makeStyles(() => ({
  recognizedQuestion: {
    width: '400px',
    maxWidth: '400px',
    display: 'flex',
  },
  recognizedAnswer: {
    width: '370px',
    maxWidth: '370px',
    display: 'flex',
  },
  recognizedTranscript: {
    display: 'flex',
    maxWidth: '300px',
  },
  question_answer: {
    flex: 1,
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'flex-start',
    '& div': {
      fontSize: '30px',
      marginTop: '5px',
      minHeight: '100px',
      wordWrap: 'break-word',
    },
    '& button': {
      marginLeft: '20px',
      marginBottom: 'auto',
    }
  },
}));
