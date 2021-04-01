import React, { useRef, useState } from "react";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { useQuery } from "react-query";
import adminService from "../../../services/adminService";
import { SalesStyles } from "../../../styles/components/SalesStyles";
import Search from "../Search";

const Sales = () => {
  const classes = SalesStyles()

  const inputEl = useRef()

  const [searchValue, setSearchValue] = useState('')

  const allSales = useQuery(["all-sales", searchValue], searchValue => adminService.getAllSales(searchValue));

  const searchHandler = () => setSearchValue(inputEl.current.value)

  const clearSearchHandler = () => {
    inputEl.current.value = ''
    setSearchValue(inputEl.current.value)
  }

  return (
    <>
      <h1>Sales questions and answers</h1>
      <Search inputEl={inputEl} searchHandler={searchHandler} clearSearchHandler={clearSearchHandler} />
      {allSales.isLoading ?
        <div className={classes.spinner_wrapper}>
          <CircularProgress className={classes.sales_spinner} />
        </div>
        :
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
      }
    </>
  );
};

export default Sales;
