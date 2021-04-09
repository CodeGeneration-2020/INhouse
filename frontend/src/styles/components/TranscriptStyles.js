import { makeStyles } from '@material-ui/core/styles';

export const TranscriptStyles = makeStyles((theme) => ({
  transcript: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    '& div': {
      maxWidth: '300px',
      marginTop: '8px',
    },
    '& button': {
      marginBottom: 'auto',
    }
  },
}));
