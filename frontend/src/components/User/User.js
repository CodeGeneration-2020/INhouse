import React from 'react'
import Feedback from './Feedback/Feedback';
import Humantic from './Humantic/Humantic';
import Recognition from './Recognition/Recocnition'
import classes from './User.module.scss';


const User = () => {
  return (
    <div className={classes.user}>
      <Humantic />
      <Feedback />
      <Recognition />
    </div>
  )
}

export default User
