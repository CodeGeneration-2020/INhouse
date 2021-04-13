import React from 'react'
import { IconButton } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import { RecognitionRowStyles } from '../../../../styles/components/RecognitionRowStyles';

const Answer = ({ text, id, deleteEntity }) => {
  const classes = RecognitionRowStyles()

  return (
    <div className={classes.answer}>
      <div>{text || 'Not found'}</div>
      <IconButton onClick={() => deleteEntity(id, 'answer')}><ClearIcon /></IconButton>
    </div>
  )
}

export default Answer
