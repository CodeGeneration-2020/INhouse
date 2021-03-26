import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import adminService from "../../../services/adminService";
import classes from "./Pre.module.scss";
import format from "date-fns/format";
import { BUTTONS, TEXTS } from "../../../helpers/constants/constants";
import { useMargin } from "../../../styles/margin";

const Pre = () => {
  const margin = useMargin();
  const allRecognized = useQuery("all-recognized", () =>
    adminService.getAllRecognized()
  );

  return (
    <>
      <h1>{TEXTS.headPRE}</h1>
      {allRecognized.isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer className={classes.container}>
          <Table className={classes.pre_section} stickyHeader>
            <TableHead className={classes.table_head}>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>{TEXTS.recordedText}</TableCell>
                <TableCell>{TEXTS.dateAdded}</TableCell>
                <TableCell className={margin.left}>{TEXTS.action}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allRecognized.data?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.user.username}</TableCell>
                  <TableCell>{row.text}</TableCell>
                  <TableCell>
                    {format(new Date(row.createdAt), "HH:mm LLL dd yyyy")}
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">
                      {BUTTONS.download}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Pre;
