import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { useQuery } from 'react-query'
import adminService from '../../../services/adminService'
import classes from './PreSection.module.scss'
import format from 'date-fns/format'

const PreSection = () => {
  const allRecognized = useQuery('all-recognized', () => adminService.getAllRecognized())

  return (
    <>
      <h1>PRE Section</h1>
      <Table className={classes.pre_section}>
        <TableHead className={classes.table_head}>
          <TableRow>
            <TableCell>Recorded text</TableCell>
            <TableCell>Date added</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allRecognized.data?.map(row =>
            <TableRow key={row._id}>
              <TableCell>{row.text}</TableCell>
              <TableCell>{format(new Date(row.createdAt), 'HH:mm LLL dd yyyy')}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary">
                  Download
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

export default PreSection
