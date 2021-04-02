import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { useQuery } from 'react-query'
import { Redirect } from 'react-router'
import authService from '../../services/authService'
import { pageSpinnerStyles } from '../../styles/pageSpinnerStyles'
import { ROLES } from '../constants/constants'

const AdminProtectedRoute = ({ Component }) => {
  const spinnerClasses = pageSpinnerStyles()
  const { data, isLoading } = useQuery('role', () => authService.roleCheck())
  if (isLoading) return <CircularProgress className={spinnerClasses.route_spinner} />
  if (data.role !== ROLES.admin) return <Redirect to='/404' />
  return <Component />
}

export default AdminProtectedRoute
