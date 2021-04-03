

import { makeStyles } from '@material-ui/core/styles';

export const RecognitionRowStyles = makeStyles(() => ({
  recognizedQuestion: {
    minWidth: '450px',
  },
  recognizedAnswer: {
    minWidth: '425px',
  },
  question_answer: {
    marginTop: '30px',
    marginLeft: '40px',
    display: 'flex',
    justifyContent: 'flex-start',
    '& div': {
      textAlign: 'start',
      fontSize: '30px',
      minHeight: '100px',
      wordWrap: 'break-word',
    }
  },
}));
