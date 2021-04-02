import React from 'react'
import { Redirect } from 'react-router'

const PreProtectedRoute = ({ Component }) => {
  const isAuthorized = localStorage.getItem('token')
  return isAuthorized ? <Component /> : <Redirect to='/login' />
}

export default PreProtectedRoute
