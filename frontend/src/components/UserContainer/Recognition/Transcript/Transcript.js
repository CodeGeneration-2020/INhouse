import React, { useState } from 'react'
import { IconButton } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import { TranscriptStyles } from '../../../../styles/components/TranscriptStyles';

const Transcript = ({ transcript }) => {
  const classes = TranscriptStyles()
  const [display, setDisplay] = useState(true)

  return (
    <div className={classes.transcript}>
      {display &&
        <>
          <div>{transcript}</div>
          <IconButton onClick={() => setDisplay(false)}><ClearIcon /></IconButton>
        </>
      }
    </div>
  )
}

export default Transcript
