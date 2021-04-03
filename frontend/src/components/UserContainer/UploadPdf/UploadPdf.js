import { Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { BUTTONS } from "../../../helpers/constants/constants";
import userService from "../../../services/userService";
import { GreenButton } from "../../../styles/buttons";
import { UploadPdfStyles } from "../../../styles/components/UploadPdfStyles";
import Select from "../Select";

const UploadPdf = () => {
  const classes = UploadPdfStyles()

  const [userId, setUserId] = useState('');

  const pdfMutation = useMutation(values => userService.uploadPdf(values));

  const selectHandler = e => setUserId(e.target.value)
  const uploadHandler = e => pdfMutation.mutate({ file: e.target.files[0], userId })

  return (
    <>
      <div className={classes.upload_wrapper}>
        <GreenButton className={classes.upload_btn} component="label" disabled={!userId}>
          {BUTTONS.uploadPdf}
          <input type="file" hidden onChange={uploadHandler} />
        </GreenButton>
        <Select state={userId} selectHandler={selectHandler} />
      </div>
      <div className={classes.warning}>If you'll send an encypted pdf, it can take a long time*</div>
      {pdfMutation.isLoading ?
        <CircularProgress className={classes.pdf_spinner} />
        :
        <>
          {pdfMutation.isError ?
            <h2 className={classes.danger}>Can not parse: Your pdf is encrypted</h2>
            :
            pdfMutation.data && (
              <>
                <h1 className={classes.header}>Parsed pdfs</h1>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Question</TableCell>
                      <TableCell>Answer</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pdfMutation.data.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.question}</TableCell>
                        <TableCell>{row.answer}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
        </>
      }
    </>
  );
};

export default UploadPdf;
