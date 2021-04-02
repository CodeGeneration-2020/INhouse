import { makeStyles } from '@material-ui/core/styles';

export const UploadPdfStyles = makeStyles((theme) => ({
  pdf: {
    
  },
  header: {
    margin: "50px auto",
  },
  danger: {
    color: "red",
    margin: "100px auto",
  },
  pdf_spinner: {
    margin: '300px auto'
  },
  table: {
    width: '80%',
    margin: '0 auto',
  },
  warning: {
    color: 'red',
    margin: '20px auto',
    fontSize: '15px',
  },
  formControl: {
    marginBottom: '10px',
    minWidth: 120,
    marginLeft: '30px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  upload_wrapper: {
    display: 'flex',
    margin: "0 auto",
    alignItems: 'center',
    justifyContent: 'center',
  }
}));