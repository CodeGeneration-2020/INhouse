import { Button, CircularProgress, IconButton, InputBase, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import adminService from "../../../services/adminService";
import format from "date-fns/format";
import { BUTTONS, TEXTS } from "../../../helpers/constants/constants";
import { PreStyles } from "../../../styles/components/PreStyles";
import SearchIcon from '@material-ui/icons/Search';

const searchStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    marginBottom: '20px'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const Pre = () => {
  const classes = PreStyles()
  const searchStyle = searchStyles()

  const inputEl = useRef()
  const [searchValue, setSearchValue] = useState('')
  const allRecognized = useQuery(["all-recognized", searchValue], searchValue => adminService.getAllRecognized(searchValue));
  const downloadMutation = useMutation(id => adminService.downloadAudio(id))

  return (
    <>
      <h1>{TEXTS.headPRE}</h1>
      {allRecognized.isLoading ?
        <CircularProgress className={classes.pre_spinner} />
        :
        <>
          <Paper className={searchStyle.root}>
            <InputBase
              className={searchStyle.input}
              placeholder="Search record by username"
              inputRef={inputEl}
            />
            <IconButton className={searchStyle.iconButton} onClick={() => setSearchValue(inputEl.current.value)}>
              <SearchIcon />
            </IconButton>
          </Paper>
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
        </>
      }
    </>
  );
};

export default Pre;
