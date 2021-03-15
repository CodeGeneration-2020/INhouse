import React from 'react'
import { Redirect } from 'react-router'

const ProtectedRoute = ({ Component }) => {
  const isAuthorized = localStorage.getItem('token')
  return isAuthorized ? <Component /> : <Redirect to='/login' />
}

export default ProtectedRoute
