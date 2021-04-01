

import { makeStyles } from '@material-ui/core/styles';

export const RecognitionRowStyles = makeStyles(() => ({
  recognizedText: {
    fontSize: '30px',
    maxWidth: '300px',
    minHeight: '300px',
    wordWrap: 'break-word',
  },
  
  question_answer: {
    display: 'flex',
    justifyContent: 'space-around',
    minHeight: '100px'
  },
  
  question: {
    width: '300px',
    justifyContent: 'start',
  },
  
  answer: {
    width: '300px',
    justifyContent: 'start',
  }
}));
