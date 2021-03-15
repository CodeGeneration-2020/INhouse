import { Input } from '@material-ui/core';
import React from 'react'
import classes from './Humantic.module.scss';

const Humantic = () => {
  return (
    <div className={classes.humantic}>
      <Input placeholder='linkedIn URL' />
      <h1>Humantic</h1>
    </div>
  )
}

export default Humantic
