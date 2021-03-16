import classes from './Feedback.module.scss';
import React from 'react'
import { FEEDBACK } from '../constants/constants';

const Feedback = () => {
  return (
    <div className={classes.feedback}>
      <h1>{FEEDBACK.title}</h1>
    </div>
  )
}

export default Feedback

