import {
  Button,
  CircularProgress,
  ListItem,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router";
import { BUTTONS, TEXTS } from "../../../helpers/constants/constants";
import adminService from "../../../services/adminService";
import { GreenButton } from "../../../styles/buttons";
import { useMargin } from "../../../styles/margin";
import HumanticResponse from "../../UserContainer/Humantic/HumanticResponse/HumanticResponse";
import classes from "./General.module.scss";

const General = () => {
  const margin = useMargin();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const linkedinCount = useQuery("linkedin-count", () =>
    adminService.getLinkedinCount()
  );
  const users = useQuery("users", () => adminService.getUsers());
  const analyzes = useMutation("analysis", (userId) =>
    adminService.getUserRequestedAnalysis(userId)
  );

  const metrics = useQuery("metrics", async () => {
    const algolia = await adminService.getMetrics({ service: "algolia" });
    const humantic = await adminService.getMetrics({ service: "humantic" });
    return { algolia, humantic };
  });

  const deleteUserMutation = useMutation((id) => adminService.deleteUser(id), {
    onSuccess: () => queryClient.invalidateQueries("users"),
  });

  const handleOpen = (userId) => {
    setOpen(true);
    analyzes.mutate(userId);
  };

  return (
    <>
      <GreenButton
        className={classes.add_user}
        variant="contained"
        onClick={() => history.push("/add_user")}
      >
        {BUTTONS.addUser}
      </GreenButton>
      <h2>{TEXTS.headGeneral}</h2>
      {users.isLoading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell>{TEXTS.username}</TableCell>
              <TableCell className={margin.left}>{TEXTS.action}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.data?.map((user) => (
              <TableRow className={classes.user} key={user.id}>
                <TableCell>
                  <ListItem
                    className={classes.username}
                    button
                    onClick={() => handleOpen(user.id)}
                  >
                    {user.username}
                  </ListItem>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteUserMutation.mutate(user.id)}
                  >
                    {BUTTONS.remove}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <h2 className={classes.metrics}>
        {metrics.isLoading ? (
          <CircularProgress />
        ) : (
        `${TEXTS.metrics}: ${TEXTS.algolia} - ${metrics.data?.algolia},
        ${TEXTS.humantic} - ${metrics.data?.humantic}`
        )}
      </h2>
      <h2>
        {TEXTS.linkedin}: {linkedinCount?.data}
      </h2>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={classes.modal}
      >
        <div className={classes.modal_container}>
          {analyzes.isLoading ? (
            <CircularProgress />
          ) : (
            analyzes.data?.map((analysis) => (
              <HumanticResponse
                key={analysis._id}
                linkedinInfo={analysis.analysis}
              />
            ))
          )}
        </div>
      </Modal>
    </>
  );
};

export default General;
