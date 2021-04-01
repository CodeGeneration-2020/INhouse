import { makeStyles } from '@material-ui/core/styles';

export const HumanticResponseStyles = makeStyles(() => ({
  danger_text: {
    color: 'red',
  },
  safe_text: {
    color: 'blue',
  },
  linkedinInfo: {
    alignSelf: 'flex-start',
    fontSize: '20px',
  }
}));