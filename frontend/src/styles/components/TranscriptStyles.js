import { makeStyles } from '@material-ui/core/styles';

export const TranscriptStyles = makeStyles((theme) => ({
  transcript: {
      display: 'flex',
      maxWidth: '300px',
      '& div': {
        maxWidth: '300px',
        marginTop: '8px',
      },
      '& button': {
        marginBottom: 'auto',
      }
    },
}));
