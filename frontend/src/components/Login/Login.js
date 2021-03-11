import React, { useState } from 'react'
import './Login.css'
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formValue, setFormValue] = useState({ username: '', password: '' })
  const history = useHistory()

  const usernameInputHandler = e => {
    setFormValue({ ...formValue, username: e.target.value })
  }

  const pwdInputHandler = e => {
    setFormValue({ ...formValue, password: e.target.value })
  }

  const loginHandler = e => {
    e.preventDefault();
    if (!formValue.username || !formValue.password) return;
    const authUrl = 'http://localhost:3000/user/login'
    const userAuthInfo = {
      "username": formValue.username,
      "password": formValue.password
    }
    axios
      .post(authUrl, userAuthInfo)
      .then(res => {
        localStorage.setItem('token', res.data.access_token)
      })
    setFormValue({ username: '', password: '' });
    history.push('/')
  };

  return (
    <form className="login">
      <h1>Loggin in</h1>
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
      <Link className='login_link' to='/register'>Not registered yet? Register</Link>
    </form>
  )
}

export default Login
