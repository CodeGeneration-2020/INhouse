import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { useQuery } from 'react-query'
import adminService from '../../../services/adminService'
import classes from './PreSection.module.scss'

const PreSection = () => {
  const preQuery = useQuery('pre', () => adminService.getPre())
  if (preQuery.data) console.log(preQuery.data);

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
          {preQuery.data?.map(pre =>
            <TableRow key={pre.userId}>
              <TableCell>{pre.text}</TableCell>
              <TableCell>{pre.createdAt}</TableCell>
              <TableCell>Download</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

export default PreSection
