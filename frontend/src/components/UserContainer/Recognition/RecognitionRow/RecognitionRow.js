import React from "react";
import { RecognitionRowStyles } from "../../../../styles/components/RecognitionRowStyles";
import { RECOGNITION } from "../../constants/constants";

const RecognitionRow = ({ recognitionRow }) => {
  const classes = RecognitionRowStyles()

  return (
    <div className={classes.question_answer}>
      <div className={classes.question}>
        <h1>{RECOGNITION.question}</h1>
        <div className={classes.recognizedText}>{recognitionRow?.question || 'Not recognized'}</div>
      </div>
      <div className={classes.answer}>
        <h1>{RECOGNITION.answer}</h1>
        <div className={classes.recognizedText}>{recognitionRow?.answer || 'Not found'}</div>
      </div>
    </div>
  );
};

export default RecognitionRow;
