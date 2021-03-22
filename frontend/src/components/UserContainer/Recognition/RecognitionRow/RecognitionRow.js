import React from 'react'
import classes from './RecognitionRow.module.scss'

const RecognitionRow = ({ recognitionRow }) => {
  return (
    <div className={classes.question_answer}>
      <div className={classes.question}>
        <h1>Question</h1>
        <div className={classes.recognizedText}>
          {recognitionRow.question}
        </div>
      </div>
      <div className={classes.answer}>
        <h1>Answer</h1>
        <div className={classes.recognizedText}>
          {recognitionRow.answer}
        </div>
      </div>
    </div>
  )
}

export default RecognitionRow
