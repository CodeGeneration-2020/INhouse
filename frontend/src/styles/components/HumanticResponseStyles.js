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
    marginRight: '70px',
    maxHeight: '700px',
    
    fontSize: '20px',
    maxWidth: '500px',
    wordWrap: 'break-word',
  }
}));