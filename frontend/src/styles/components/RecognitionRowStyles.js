

import { makeStyles } from '@material-ui/core/styles';

export const RecognitionRowStyles = makeStyles(() => ({
  question: {
    display: 'flex',
    width: '430px',
    '& div': {
      maxWidth: '300px',
      marginTop: '8px',
      wordWrap: 'break-word'
    },
    '& button': {
      marginBottom: 'auto',
    }
  },
  answer: {
    display: 'flex',
    width: '400px',
    '& div': {
      maxWidth: '300px',
      marginTop: '8px',
      wordWrap: 'break-word'
    },
    '& button': {
      marginBottom: 'auto',
    }
  },
  content: {
    display: 'flex',
  },
}));
