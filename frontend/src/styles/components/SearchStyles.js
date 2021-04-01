import { makeStyles } from "@material-ui/core";

export const searchStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    marginBottom: '20px'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));