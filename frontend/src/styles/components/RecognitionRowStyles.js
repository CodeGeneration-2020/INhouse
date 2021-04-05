

import { makeStyles } from '@material-ui/core/styles';

export const RecognitionRowStyles = makeStyles(() => ({
  recognizedQuestion: {
    width: '445px',
    maxWidth: '445px',
    display: 'flex',
  },
  recognizedAnswer: {
    maxWidth: '435px',
    width: '435px',
    display: 'flex',
  },
  recognizedTranscript: {
    display: 'flex',
    maxWidth: '300px',
  },
  question_answer: {
    marginTop: '30px',
    marginLeft: '40px',
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
