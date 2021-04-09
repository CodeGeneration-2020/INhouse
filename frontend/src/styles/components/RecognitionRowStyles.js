

import { makeStyles } from '@material-ui/core/styles';

export const RecognitionRowStyles = makeStyles(() => ({
  question: {
    display: 'flex',
    width: '50%',
    justifyContent: 'flex-start',
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
    width: '50%',
    justifyContent: 'flex-start',
    '& div': {
      maxWidth: '300px',
      marginTop: '8px',
      wordWrap: 'break-word'
    },
    '& button': {
      marginBottom: 'auto',
    }
  },
  wrapper: {
    display: 'flex',
    width: '100%',
  }
}));
