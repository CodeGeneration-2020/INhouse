import React from 'react'
import { IconButton } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import { TranscriptStyles } from '../../../../styles/components/TranscriptStyles';

const Transcript = ({ text, deleteEntity, id }) => {
  const classes = TranscriptStyles()

  return (
    <div className={classes.transcript}>
      <div>{text}</div>
      <IconButton onClick={() => deleteEntity(id)}><ClearIcon /></IconButton>
    </div>
  )
}

export default Transcript
