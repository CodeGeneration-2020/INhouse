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
  "@global": {
    "@keyframes fadeInOpacity": {
      "0%": {
        opacity: 0,
      },
      "100%": {
        opacity: 1,
      }
    }
  },
  fadein: {
    opacity: 1,
    animationName: 'fadeInOpacity',
    animationIterationCount: 1,
    animationTimingFunction: 'ease-in',
    animationDuration: '4s',
  },
}));