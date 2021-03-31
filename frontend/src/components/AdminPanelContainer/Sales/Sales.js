import React, { useRef, useState } from "react";
import { CircularProgress, IconButton, InputBase, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { useQuery } from "react-query";
import adminService from "../../../services/adminService";
import { SalesStyles } from "../../../styles/components/SalesStyles";
import SearchIcon from '@material-ui/icons/Search';

const searchStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    marginBottom: '20px'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const Sales = () => {
  const classes = SalesStyles()
  const searchStyle = searchStyles()

  const inputEl = useRef()

  const [searchValue, setSearchValue] = useState('')

  const allSales = useQuery(["all-sales", searchValue], searchValue => adminService.getAllSales(searchValue));

  return (
    <>
      <h1>Sales questions and answers</h1>
      {allSales.isLoading ?
        <div className={classes.spinner_wrapper}>
          <CircularProgress className={classes.sales_spinner} />
        </div>
        :
        <>
          <Paper className={searchStyle.root}>
            <InputBase
              className={searchStyle.input}
              placeholder="Search question or answer"
              inputRef={inputEl}
            />
            <IconButton className={searchStyle.iconButton} onClick={() => setSearchValue(inputEl.current.value)}>
              <SearchIcon />
            </IconButton>
          </Paper>
          <TableContainer className={classes.container}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Question</TableCell>
                  <TableCell>Answer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allSales.data?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.question}</TableCell>
                    <TableCell>{row.answer}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      }
    </>
  );
};

export default Sales;
