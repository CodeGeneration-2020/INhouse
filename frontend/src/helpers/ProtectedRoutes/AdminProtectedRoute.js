import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { useQuery } from 'react-query'
import { Redirect } from 'react-router'
import authService from '../../services/authService'

const AdminProtectedRoute = ({ Component }) => {
  const { data, isLoading } = useQuery('role', () => authService.roleCheck())
  if (isLoading) return <CircularProgress />
  if (data.role !== 'ADMIN') return <Redirect to='/404' />
  return <Component />
}

export default AdminProtectedRoute
