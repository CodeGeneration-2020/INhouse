import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import classes from './Sales.module.scss'

const Sales = () => {
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
            <TableRow>
              <TableCell>What is the end?</TableCell>
              <TableCell>End</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default Sales
