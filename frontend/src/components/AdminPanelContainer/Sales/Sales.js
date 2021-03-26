import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import classes from './Sales.module.scss'
import { useQuery } from 'react-query'
import adminService from '../../../services/adminService'

const Sales = () => {
  const allSales = useQuery('all-sales', () => adminService.getAllSales())

  return (
    <>
      <h1>Sales questions and answers</h1>
      <Table className={classes.sales}>
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell>Answer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allSales.data?.map((row =>
            <TableRow key={row.id}>
              <TableCell>{row.question}</TableCell>
              <TableCell>{row.answer}</TableCell>
            </TableRow>))}
        </TableBody>
      </Table>
    </>
  )
}

export default Sales
