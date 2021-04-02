import React from 'react'
import { NotFoundStyles } from '../../styles/components/NotFoundStyles'

const NotFound = () => {
  const classes = NotFoundStyles()

  return (
    <h1 className={classes.not_found}>
      Page not found
    </h1>
  )
}

export default NotFound
