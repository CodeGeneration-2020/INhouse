import { Button, CircularProgress, ListItem, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@material-ui/core";

import React, { useState, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router";
import { BUTTONS, TEXTS } from "../../../helpers/constants/constants";
import adminService from "../../../services/adminService";
import { GreenButton } from "../../../styles/buttons";
import { GeneralStyles } from "../../../styles/components/GeneralStyles";
import HumanticResponse from "../../UserContainer/Humantic/HumanticResponse/HumanticResponse";
import Search from "../Search";

const General = () => {
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

  const searchHandler = () => setSearchValue(inputEl.current.value)

  const clearSearchHandler = () => {
    inputEl.current.value = ''
    setSearchValue(inputEl.current.value)
  }

  return (
    <>
      <GreenButton className={classes.add_user} variant="contained" onClick={() => history.push("/add_user")}>
        {BUTTONS.addUser}
      </GreenButton>
      <h2>{TEXTS.headGeneral}</h2>
      <Search inputEl={inputEl} searchHandler={searchHandler} clearSearchHandler={clearSearchHandler} />
      {users.isLoading ?
        <CircularProgress className={classes.users_spinner} />
        :
        <TableContainer className={classes.container}>
          <Table stickyHeader>
            <TableHead>
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
        </TableContainer>
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
            <>
              {analyzes.data?.length === 0 ?
                <h3 className={classes.empty_modal}>This user has not searched for linkedin profiles yet.</h3>
                :
                analyzes.data?.map((analysis) => <HumanticResponse key={analysis._id} linkedinInfo={analysis.analysis} />)
              }
            </>
          }
        </div>
      </Modal>
    </>
  );
};

export default General;
