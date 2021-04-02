import React from 'react'
import { TextField } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom'
import { useForm } from '../../helpers/Hooks/UseForm';
import { strategy } from './strategy';
import { GreenButton } from '../../styles/buttons';
import { useMutation } from 'react-query';
import authService from "../../services/authService";
import { AuthStyles } from '../../styles/components/AuthStyles';

const Auth = ({ authType }) => {
  const classes = AuthStyles()
  const history = useHistory()
  const text = strategy[authType]
  const [formValues, setField] = useForm({ username: '', password: '', role: 'PRE' })

  const authMutation = useMutation(authValues => authService.auth(authValues), {
    onSuccess: () => history.push(text.link)
  })

  const authHandler = e => {
    e.preventDefault();
    if (!formValues.username || !formValues.password) return;
    authMutation.mutate({ authType, formValues })
  };

  return (
    <div className={classes.wrapper}>
      <form className={classes.login}>
        <h1>{text.header}</h1>
        <TextField
          size="medium"
          className={classes.textfield}
          variant="standard"
          label="Username"
          value={formValues.username}
          name="username"
          onChange={setField}
        />
        <TextField
          size="medium"
          className={classes.textfield}
          variant="standard"
          label="Password"
          value={formValues.password}
          name="password"
          onChange={setField}
        />
        <GreenButton
          className={classes.authBtn}
          variant="contained"
          color="primary"
          type="submit"
          onClick={authHandler}
        >
          {text.button}
        </GreenButton>
        <Link className={classes.login_link} to={`${text.questionLink}`}>
          {text.question}
        </Link>
      </form>
    </div>
  )
}

export default Auth
