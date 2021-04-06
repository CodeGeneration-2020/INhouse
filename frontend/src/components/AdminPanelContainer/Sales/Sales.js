import React, { useEffect, useRef, useState } from "react";
import { CircularProgress, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { useMutation, useQuery, useQueryClient } from "react-query";
import adminService from "../../../services/adminService";
import { SalesStyles } from "../../../styles/components/SalesStyles";
import Search from "../Search";
import Select from "../../UserContainer/Select";
import { useForm } from '../../../helpers/Hooks/UseForm';
import { GreenButton } from "../../../styles/buttons";
import userService from "../../../services/userService";
import { BUTTONS } from "../../../helpers/constants/constants";

const Sales = () => {
  const classes = SalesStyles()

  const inputEl = useRef()
  const queryClient = useQueryClient();

  const [formValues, setField, reset] = useForm({ relatedTo: '', context: '', answer: '', question: '' })
  const [searchValue, setSearchValue] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const allSales = useQuery(["all-sales", searchValue], searchValue => adminService.getAllSales(searchValue));
  const createSales = useMutation(salesValues => adminService.createSales(salesValues), {
    onSuccess: () => {
      queryClient.invalidateQueries('all-sales')
      reset()
    },
  })

  const searchHandler = () => setSearchValue(inputEl.current.value)

  const clearSearchHandler = () => {
    inputEl.current.value = ''
    setSearchValue(inputEl.current.value)
  }

  useEffect(() => {
    const { question, answer, context, relatedTo } = formValues
    setButtonDisabled(!question || !answer || !context || !relatedTo)
  }, [formValues])

  const createSalesHandler = () => createSales.mutate(formValues)
  
  const pdfMutation = useMutation(values => userService.uploadPdf(values), {
    onSuccess: () => queryClient.invalidateQueries('all-sales')
  });

  const uploadHandler = e => pdfMutation.mutate({ file: e.target.files[0], userId: formValues.relatedTo })

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
        <Select className={classes.input_sales} state={formValues.userId} selectHandler={setField} />
        <GreenButton
          variant="contained"
          disabled={buttonDisabled}
          className={classes.add_sales_button}
          onClick={createSalesHandler}
        >
          Add
        </GreenButton>
      </div>
      <GreenButton className={classes.upload_btn} variant='contained' component="label" disabled={!formValues.relatedTo}>
        {BUTTONS.uploadPdf}
        <input type="file" hidden onChange={uploadHandler} />
      </GreenButton>
      {pdfMutation.isLoading && <CircularProgress className={classes.pdf_spinner} />}
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
