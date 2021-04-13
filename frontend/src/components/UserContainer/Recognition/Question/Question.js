import React from 'react'
import { IconButton } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import { RecognitionRowStyles } from '../../../../styles/components/RecognitionRowStyles';
import { HUMANTIC } from '../../constants/constants'

const Question = ({ text, id, deleteEntity, whatToSay }) => {
  const classes = RecognitionRowStyles()

  return (
    <div className={classes.question}>
      {whatToSay ?
        <div><b>{HUMANTIC.response.say}: </b>{whatToSay}</div>
        :
        <div>{text || 'Not found'}</div>
      }
      <IconButton onClick={() => deleteEntity(id, 'question')}><ClearIcon /></IconButton>
    </div>
  )
}

export default Question
