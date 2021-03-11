import React, { useState } from 'react'
import './Login.css'
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';

const Login = () => {
  const [formValue, setFormValue] = useState({ username: '', password: '' })

  const usernameInputHandler = e => {
    setFormValue({ ...formValue, username: e.target.value })
  }

  const pwdInputHandler = e => {
    setFormValue({ ...formValue, password: e.target.value })
  }

  const loginHandler = e => {
    e.preventDefault();
    if (!formValue.username || !formValue.password) return;
    const authUrl = 'http://localhost:3000/auth/login'
    axios
      .post(authUrl, {
        "username": formValue.username,
        "password": formValue.password
      })
      .then(res => console.log(res))
    setFormValue({ username: '', password: '' });
  };

  return (
    <form className="login">
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
        onClick={loginHandler}
      >
        Log In
      </Button>
    </form>
  )
}

export default Login
