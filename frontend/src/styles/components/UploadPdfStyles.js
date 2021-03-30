import { makeStyles } from '@material-ui/core/styles';

export const UploadPdfStyles = makeStyles(() => ({
  pdf: {
    width: "300px",
    margin: "0 auto",
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
  }
}));