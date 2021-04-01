import { Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import { useMutation, useQuery } from "react-query";
import adminService from "../../../services/adminService";
import format from "date-fns/format";
import { BUTTONS, TEXTS } from "../../../helpers/constants/constants";
import { PreStyles } from "../../../styles/components/PreStyles";

const Pre = () => {
  const classes = PreStyles()
  const allRecognized = useQuery("all-recognized", () => adminService.getAllRecognized());
  const downloadMutation = useMutation(id => adminService.downloadAudio(id))

  return (
    <>
      <h1>{TEXTS.headPRE}</h1>
      {allRecognized.isLoading ?
        <CircularProgress className={classes.pre_spinner} />
        :
        <TableContainer className={classes.container}>
          <Table className={classes.pre_section} stickyHeader>
            <TableHead className={classes.table_head}>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>{TEXTS.recordedText}</TableCell>
                <TableCell>{TEXTS.dateAdded}</TableCell>
                <TableCell align='right'>{TEXTS.action}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allRecognized.data?.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.user?.username}</TableCell>
                  <TableCell>{row.text}</TableCell>
                  <TableCell>{format(new Date(row.createdAt), "HH:mm LLL dd yyyy")}</TableCell>
                  <TableCell align='right'>
                    <Button variant="contained" color="primary" onClick={() => downloadMutation.mutate(row.fileId)}>
                      {BUTTONS.download}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  );
};

export default Pre;
