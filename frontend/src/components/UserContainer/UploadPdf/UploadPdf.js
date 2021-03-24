import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import { useMutation } from 'react-query';
import userService from '../../../services/userService';

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
    <Button className={classes.pdf} variant="contained" component="label">
      Upload File
      <input
        type="file"
        hidden
        onChange={e => pdfMutation.mutate(e.target.files[0])}
      />
    </Button>
  )
}

export default UploadPdf
