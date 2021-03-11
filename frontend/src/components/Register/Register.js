import React, { useState } from 'react'
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom'
import './Register.css'

const Register = () => {
  const [formValue, setFormValue] = useState({ username: '', password: '' })
  const history = useHistory()

  const usernameInputHandler = e => {
    setFormValue({ ...formValue, username: e.target.value })
  }

  const pwdInputHandler = e => {
    setFormValue({ ...formValue, password: e.target.value })
  }

  const loginHandler = async e => {
    e.preventDefault();
    if (!formValue.username || !formValue.password) return;
    const authUrl = 'http://localhost:3000/user/register'
    const userAuthInfo = {
      "username": formValue.username,
      "password": formValue.password
    }
    await axios.post(authUrl, userAuthInfo)
    setFormValue({ username: '', password: '' });
    history.push('/login')
  };

  return (
    <>
      <form className="login">
        <h1>Registeration</h1>
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
          Register
      </Button>
        <Link className="login_link" to="user/login">Already registered? Log in</Link>
      </form>
    </>
  )
}

export default Register
