import { makeStyles } from '@material-ui/core/styles';

export const SalesStyles = makeStyles(() => ({
  container: {
    maxHeight: '600px',
    marginBottom: '100px'
  },
  sales_spinner: {
    margin: '50px',
  },
  spinner_wrapper: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '700px',
    width: '100%',
  },
  input_sales: {
    marginTop: '16.5px',
    marginRight: '20px',
  },
  add_sales_button: {
    marginLeft: '10px',
    minWidth: '100px',
  }
}));
