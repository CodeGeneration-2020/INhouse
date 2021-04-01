import React from "react";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { useQuery } from "react-query";
import adminService from "../../../services/adminService";
import { SalesStyles } from "../../../styles/components/SalesStyles";

const Sales = () => {
  const classes = SalesStyles()
  const allSales = useQuery("all-sales", () => adminService.getAllSales());

  return (
    <>
      <h1>Sales questions and answers</h1>
      {allSales.isLoading ?
        <CircularProgress className={classes.sales_spinner} />
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
