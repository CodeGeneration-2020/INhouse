

import { makeStyles } from '@material-ui/core/styles';

export const GeneralStyles = makeStyles(() => ({
  metrics: {
    marginTop: '100px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    border: 'none',
    outline: 'none',
  },
  modal_container: {
    margin: '0 auto',
    border: 'none',
    outline: 'none',
    borderRadius: '10px',
    width: '600px',
    height: '350px',
    overflowY: 'auto',
    backgroundColor: 'white',
    padding: '20px',
  },
  add_user: {
    marginLeft: 'auto',
    fontSize: '20px',
    height: '40px',
    marginTop: '15px',
  },
  right: {
    marginLeft: 'auto',
    width: '100px'
  },
  users_spinner: {
    maxWidth: '50px',
  },
  analyzes_spinner: {
    marginTop: '140px',
    marginLeft: '275px',
  }
}));