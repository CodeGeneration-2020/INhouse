import React from 'react'
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom'
import classes from './Auth.module.scss'
import { useForm } from '../../helpers/Hooks/UseForm';

const Auth = ({ auth }) => {
  const [formValues, setField] = useForm({ username: '', password: '' })
  const history = useHistory()

  const authHandler = async e => {
    e.preventDefault();
    if (!formValues.username || !formValues.password) return;
    const authUrl = `http://localhost:3000/user/${auth}`
    const res = await axios.post(authUrl, formValues)
    if (auth === 'login') {
      localStorage.setItem('token', res.data.access_token);
    }
    history.push(`${auth === 'register' ? '/login' : '/'}`)
  };

  return (
    <form className={classes.login}>
      <h1>{auth === 'register' ? 'Registeration' : 'Loggin In'}</h1>
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
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={authHandler}
      >
        {auth === 'register' ? 'Register' : 'Log In'}
      </Button>
      <Link
        className="login_link"
        to={`${auth === 'register' ? '/login' : '/register'}`}>
        {auth === 'register' ? 'Already registered? Log in' : 'Not registered yet? Register'}
      </Link>
    </form>
  )
}

export default Auth
