import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from "@material-ui/core";
import React from "react";
import { useMutation } from "react-query";
import { BUTTONS } from "../../../helpers/constants/constants";
import userService from "../../../services/userService";
import { GreenButton } from "../../../styles/buttons";
import { UploadPdfStyles } from "../../../styles/components/UploadPdfStyles";

const UploadPdf = () => {
  const classes = UploadPdfStyles()
  const pdfMutation = useMutation((file) => userService.uploadPdf(file));

  return (
    <>
      <GreenButton
        className={classes.pdf}
        variant="contained"
        component="label"
      >
        {BUTTONS.uploadPdf}
        <input
          type="file"
          hidden
          onChange={(e) => pdfMutation.mutate(e.target.files[0])}
        />
      </GreenButton>
      <div className={classes.warning}>If you'll send an encypted pdf, it can take a long time*</div>
      {pdfMutation.isLoading ? (
        <CircularProgress className={classes.pdf_spinner} />
      ) : (
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
      )}
    </>
  );
};

export default UploadPdf;
