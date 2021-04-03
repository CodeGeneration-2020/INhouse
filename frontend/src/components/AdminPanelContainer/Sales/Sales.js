import React, { useEffect, useRef, useState } from "react";
import { CircularProgress, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { useQuery } from "react-query";
import adminService from "../../../services/adminService";
import { SalesStyles } from "../../../styles/components/SalesStyles";
import Search from "../Search";
import Select from "../../UserContainer/Select";
import { useForm } from '../../../helpers/Hooks/UseForm';
import { GreenButton } from "../../../styles/buttons";

const Sales = () => {
  const classes = SalesStyles()

  const inputEl = useRef()

  const [formValues, setField] = useForm({ question: '', answer: '', context: '', userId: '' })
  const [searchValue, setSearchValue] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const allSales = useQuery(["all-sales", searchValue], searchValue => adminService.getAllSales(searchValue));

  useEffect(() => {
    const { question, answer, context, userId } = formValues
    !question || !answer || !context || !userId ? setButtonDisabled(true) : setButtonDisabled(false)
  }, [formValues])

  const searchHandler = () => setSearchValue(inputEl.current.value)

  const clearSearchHandler = () => {
    inputEl.current.value = ''
    setSearchValue(inputEl.current.value)
  }

  return (
    <>
      <h2>Add sales question and answer</h2>
      <div>
        <Input
          className={classes.input_sales}
          placeholder='question'
          value={formValues.question}
          name="question"
          onChange={setField} />
        <Input
          className={classes.input_sales}
          placeholder='answer'
          value={formValues.answer}
          name="answer"
          onChange={setField}
        />
        <Input
          className={classes.input_sales}
          placeholder='context'
          value={formValues.context}
          name="context"
          onChange={setField}
        />
        <Select className={classes.input_sales} state={formValues} selectHandler={setField} />
        <GreenButton
          disabled={buttonDisabled}
          className={classes.add_sales_button}
          onClick={() => console.log(formValues)}
        >
          Add
        </GreenButton>
      </div>
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
