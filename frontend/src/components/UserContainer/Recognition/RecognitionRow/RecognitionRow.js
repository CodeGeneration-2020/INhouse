import { IconButton } from "@material-ui/core";
import React, { useState } from "react";
import { RecognitionRowStyles } from "../../../../styles/components/RecognitionRowStyles";
import ClearIcon from '@material-ui/icons/Clear';

const RecognitionRow = ({ recognitionRow }) => {
  const classes = RecognitionRowStyles()
  const [display, setDisplay] = useState({ question: true, answer: true, transcript: true })

  return (
    <div className={classes.question_answer}>
      <div className={classes.recognizedQuestion}>
        {display.question &&
          <>
            <div>{recognitionRow?.question || 'Not found'}</div>
            <IconButton onClick={() => setDisplay({ ...display, question: false })}><ClearIcon /></IconButton>
          </>
        }
      </div>
      <div className={classes.recognizedAnswer}>
        {display.answer &&
          <>
            <div>{recognitionRow?.answer || 'Not found'}</div>
            <IconButton onClick={() => setDisplay({ ...display, answer: false })}><ClearIcon /></IconButton>
          </>
        }
      </div>
      <div className={classes.recognizedTranscript}>
        {display.transcript &&
          <>
            <div>{recognitionRow?.question || 'Not found'}</div>
            <IconButton onClick={() => setDisplay({ ...display, transcript: false })}><ClearIcon /></IconButton>
          </>
        }
      </div>
    </div>
  );
};

export default RecognitionRow;
