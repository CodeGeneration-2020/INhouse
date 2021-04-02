import { Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, FormControl, InputLabel, NativeSelect } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { BUTTONS } from "../../../helpers/constants/constants";
import userService from "../../../services/userService";
import { GreenButton } from "../../../styles/buttons";
import { UploadPdfStyles } from "../../../styles/components/UploadPdfStyles";

const UploadPdf = () => {
  const classes = UploadPdfStyles()

  const [userId, setUserId] = useState(false);

  const pdfMutation = useMutation(file => userService.uploadPdf(file));

  useEffect(() => {
    console.log(userId);
  }, [userId])

  const uploadHandler = e => pdfMutation.mutate(e.target.files[0])

  return (
    <>
      <div className={classes.upload_wrapper}>
        <GreenButton className={classes.pdf} component="label">
          {BUTTONS.uploadPdf}
          <input type="file" hidden onChange={uploadHandler} />
        </GreenButton>
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="user">Related user</InputLabel>
          <NativeSelect
            value={userId}
            onChange={e => setUserId(e.target.value)}
            inputProps={{ name: 'Username', id: 'user' }}
          >
            <option value={false}>None</option>
            <option value={10}>elon</option>
            <option value={20}>steve</option>
            <option value={30}>jeff</option>
          </NativeSelect>
        </FormControl>
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
