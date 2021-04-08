import { IconButton } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import React, { useState } from "react";
import { RecognitionRowStyles } from "../../../../styles/components/RecognitionRowStyles";

const RecognitionRow = ({ recognitionRow }) => {
  const classes = RecognitionRowStyles()
  const [display, setDisplay] = useState({ question: true, answer: true })

  return (
    <div className={classes.content}>
      <div className={classes.question}>
        {display.question &&
          <>
            <div>{recognitionRow?.question || 'Not found'}</div>
            <IconButton onClick={() => setDisplay({ ...display, question: false })}><ClearIcon /></IconButton>
          </>
        }
      </div>
      <div className={classes.answer}>
        {display.answer &&
          <>
            <div>{recognitionRow?.answer || 'Not found'}</div>
            <IconButton onClick={() => setDisplay({ ...display, answer: false })}><ClearIcon /></IconButton>
          </>
        }
      </div>
    </div>
  );
};

export default RecognitionRow;
