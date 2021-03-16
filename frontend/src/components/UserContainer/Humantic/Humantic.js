import { Input } from '@material-ui/core';
import React from 'react'
import { HUMANTIC } from '../constants/constants';
import classes from './Humantic.module.scss';

const Humantic = () => {
  return (
    <div className={classes.humantic}>
      <Input placeholder='linkedIn URL' />
      <h1>{HUMANTIC.title}</h1>
    </div>
  )
}

export default Humantic
