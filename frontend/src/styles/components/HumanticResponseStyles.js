import { makeStyles } from '@material-ui/core/styles';

export const HumanticResponseStyles = makeStyles(() => ({
  danger_text: {
    color: 'red',
  },
  safe_text: {
    color: 'blue',
  },
  linkedinInfo: {
    fontSize: '20px',
    wordWrap: 'break-word',
  },
  animation: {
    visibility: 'hidden',
    opacity: 0,
    transition: 'visibility 0s, opacity 0.5s linear',
  }
}));