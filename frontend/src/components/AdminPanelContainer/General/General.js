import { Button, CircularProgress, IconButton, InputBase, ListItem, makeStyles, Modal, Paper, Table, TableBody, TableCell, TableHead, TableRow, } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import React, { useState, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router";
import { BUTTONS, TEXTS } from "../../../helpers/constants/constants";
import adminService from "../../../services/adminService";
import { GreenButton } from "../../../styles/buttons";
import { GeneralStyles } from "../../../styles/components/GeneralStyles";
import HumanticResponse from "../../UserContainer/Humantic/HumanticResponse/HumanticResponse";

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

const General = () => {
  const searchStyle = searchStyles()
  const classes = GeneralStyles();
  const history = useHistory();
  const queryClient = useQueryClient();

  const inputEl = useRef()

  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);

  const linkedinCount = useQuery("linkedin-count", () => adminService.getLinkedinCount());
  const users = useQuery(["users", searchValue], searchValue => adminService.getUsers(searchValue));
  const analyzes = useMutation("analysis", userId => adminService.getUserRequestedAnalysis(userId));

  const metrics = useQuery("metrics", async () => {
    const algolia = await adminService.getMetrics({ service: "algolia" });
    const humantic = await adminService.getMetrics({ service: "humantic" });
    return { algolia, humantic };
  });

  const deleteUserMutation = useMutation(id => adminService.deleteUser(id), {
    onSuccess: () => queryClient.invalidateQueries("users"),
  });

  const handleOpen = userId => {
    setOpen(true);
    analyzes.mutate(userId);
  };

  return (
    <>
      <GreenButton className={classes.add_user} variant="contained" onClick={() => history.push("/add_user")}>
        {BUTTONS.addUser}
      </GreenButton>
      <h2>{TEXTS.headGeneral}</h2>
      {users.isLoading ?
        <CircularProgress className={classes.users_spinner} />
        :
        <>
          <Paper className={searchStyle.root}>
            <InputBase
              className={searchStyle.input}
              placeholder="Search User"
              inputRef={inputEl}
            />
            <IconButton className={searchStyle.iconButton} onClick={() => setSearchValue(inputEl.current.value)}>
              <SearchIcon />
            </IconButton>
          </Paper>
          <Table>
            <TableHead className={searchStyle.head}>
              <TableRow>
                <TableCell>{TEXTS.username}</TableCell>
                <TableCell align='right'>{TEXTS.action}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.data?.map((user) => (
                <TableRow className={classes.user} key={user.id}>
                  <TableCell>
                    <ListItem className={classes.username} button onClick={() => handleOpen(user.id)}>
                      {user.username}
                    </ListItem>
                  </TableCell>
                  <TableCell align='right'>
                    {user.username !== localStorage.getItem('username') &&
                      <Button variant="contained" color="secondary" onClick={() => deleteUserMutation.mutate(user.id)}>
                        {BUTTONS.remove}
                      </Button>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      }
      <h2 className={classes.metrics}>
        {metrics.isLoading ?
          <CircularProgress />
          :
          `${TEXTS.metrics}: ${TEXTS.algolia} - ${metrics.data?.algolia}, ${TEXTS.humantic} - ${metrics.data?.humantic}`
        }
      </h2>
      <h2>{TEXTS.linkedin}: {linkedinCount?.data}</h2>
      <Modal open={open} onClose={() => setOpen(false)} className={classes.modal}>
        <div className={classes.modal_container}>
          {analyzes.isLoading ?
            <CircularProgress className={classes.analyzes_spinner} />
            :
            analyzes.data?.map((analysis) => <HumanticResponse key={analysis._id} linkedinInfo={analysis.analysis} />)
          }
        </div>
      </Modal>
    </>
  );
};

export default General;
