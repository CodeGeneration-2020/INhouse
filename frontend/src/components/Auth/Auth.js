import React, { useState } from 'react'
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom'
import './Auth.css'

const Auth = ({ auth }) => {
  const [formValue, setFormValue] = useState({ username: '', password: '' })
  const history = useHistory()

  const usernameInputHandler = e => {
    setFormValue({ ...formValue, username: e.target.value })
  }

  const pwdInputHandler = e => {
    setFormValue({ ...formValue, password: e.target.value })
  }

  const authHandler = async e => {
    e.preventDefault();
    if (!formValue.username || !formValue.password) return;
    const authUrl = `http://localhost:3000/user/${auth}`
    const res = await axios.post(authUrl, formValue)
    if (auth === 'login') {
      localStorage.setItem('token', res.data.access_token);
    }
    setFormValue({ username: '', password: '' });
    history.push(`${auth === 'register' ? '/login' : '/'}`)
  };

  return (
    <>
      <form className="login">
        <h1>{auth === 'register' ? 'Registeration' : 'Loggin In'}</h1>
        <TextField
          size="medium"
          className="textfield"
          variant="standard"
          label="Username"
          value={formValue.username}
          onChange={usernameInputHandler}
        />
        <TextField
          size="medium"
          className="textfield"
          variant="standard"
          label="Password"
          value={formValue.password}
          onChange={pwdInputHandler}
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
          Already registered? Log in
        </Link>
      </form>
    </>
  )
}

export default Auth
