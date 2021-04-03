import React from "react";
import { RecognitionRowStyles } from "../../../../styles/components/RecognitionRowStyles";

const RecognitionRow = ({ recognitionRow }) => {
  const classes = RecognitionRowStyles()

  return (
    <div className={classes.question_answer}>
      <div className={classes.recognizedQuestion}>{recognitionRow?.question || 'Not recognized'}</div>
      <div className={classes.recognizedAnswer}>{recognitionRow?.answer || 'Not found'}</div>
      <div className={classes.recognizedTranscript}>{recognitionRow?.question || 'Not recognized'}</div>
    </div>
  );
};

export default RecognitionRow;
