import React from 'react'
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom'
import classes from './Auth.module.scss'
import { useForm } from '../../helpers/Hooks/UseForm';
import { strategy } from './strategy';


const Auth = ({ auth }) => {
  const [formValues, setField] = useForm({ username: '', password: '' })
  const history = useHistory()
  const text = strategy[auth]
  
  const authHandler = async e => {
    e.preventDefault();
    if (!formValues.username || !formValues.password) return;
    const authUrl = `http://localhost:3000/user/${text.endpoint}`
    const res = await axios.post(authUrl, formValues)
    if (auth === 'login') {
      localStorage.setItem('token', res.data.access_token);
    }
    history.push(`${text.link}`)
  };

  return (
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
      <Button
        className={classes.authBtn}
        variant="contained"
        color="primary"
        type="submit"
        onClick={authHandler}
      >
        {text.button}
      </Button>
      <Link className="login_link" to={`${text.questionLink}`}>
        {text.question}
      </Link>
    </form>
  )
}

export default Auth
