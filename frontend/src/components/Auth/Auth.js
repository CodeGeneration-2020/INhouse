import React from 'react'
import { TextField } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom'
import classes from './Auth.module.scss'
import { useForm } from '../../helpers/Hooks/UseForm';
import { strategy } from './strategy';
import { GreenButton } from '../../styles/buttons';
import { useMutation } from 'react-query';
import authService from "../../services/authService";

const Auth = ({ auth }) => {
  const history = useHistory()
  const text = strategy[auth]
  const [formValues, setField] = useForm({ username: '', password: '' })
  
  const login = useMutation(formValues => authService.login(formValues), {
    onSuccess: () => history.push('/')
  })

  const register = useMutation(formValues => authService.register(formValues), {
    onSuccess: () => auth === 'register' ? history.push('/login') : history.push('/admin_panel')
  })

  const authHandler = e => {
    e.preventDefault();
    if (!formValues.username || !formValues.password) return;
    auth === 'login' ? login.mutate(formValues) : register.mutate(formValues)
  };

  return (
    <div className={classes.wrapper}>
      <form className={classes.login}>
        <h1>{text.header}</h1>
        <TextField
          size="medium"
          className="textfield"
          variant="standard"
          label="Username"
          value={formValues.username}
          name="username"
          onChange={setField}
        />
        <TextField
          size="medium"
          className="textfield"
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
        <Link className="login_link" to={`${text.questionLink}`}>
          {text.question}
        </Link>
      </form>
    </div>
  )
}

export default Auth
