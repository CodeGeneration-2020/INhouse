import { makeStyles } from '@material-ui/core/styles';

export const SelectStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '200px',
    maxWidth: '250px',
    marginBottom: '12px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
