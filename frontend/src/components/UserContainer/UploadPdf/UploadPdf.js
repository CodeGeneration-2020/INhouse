import { makeStyles } from '@material-ui/core'
import React from 'react'
import { useMutation } from 'react-query';
import { BUTTONS } from '../../../helpers/constants/constants';
import userService from '../../../services/userService';
import { GreenButton } from '../../../styles/buttons';

const useStyles = makeStyles(() => ({
  pdf: {
    width: '300px',
    margin: '0 auto',
  },
}));

const UploadPdf = () => {
  const classes = useStyles()
  const pdfMutation = useMutation(file => userService.uploadPdf(file), {
    onSuccess: res => console.log(res)
  })

  return (
    <GreenButton className={classes.pdf} variant="contained" component="label">
      {BUTTONS.uploadPdf}
      <input
        type="file"
        hidden
        onChange={e => pdfMutation.mutate(e.target.files[0])}
      />
    </GreenButton>
  )
}

export default UploadPdf
