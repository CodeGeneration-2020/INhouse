import {
  Table,
  makeStyles,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from "@material-ui/core";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { BUTTONS } from "../../../helpers/constants/constants";
import userService from "../../../services/userService";
import { GreenButton } from "../../../styles/buttons";

const useStyles = makeStyles(() => ({
  pdf: {
    width: "300px",
    margin: "0 auto",
  },
  wrapper: {
    width: "80%",
    margin: '0 auto',
  },
  header: {
    margin: "50px auto",
  },
}));

const UploadPdf = () => {
  const [parsedPdfs, setParsedPdfs] = useState([]);
  const classes = useStyles();
  const pdfMutation = useMutation((file) => userService.uploadPdf(file), {
    onSuccess: (res) => setParsedPdfs(res),
  });

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
      {pdfMutation.isLoading && <CircularProgress />}
      <h1 className={classes.header}>Parsed pdfs</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parsedPdfs.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.question}</TableCell>
                <TableCell>{row.answer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </>
  );
};

export default UploadPdf;
