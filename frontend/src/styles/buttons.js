import { Button, withStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export const GreenButton = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);
