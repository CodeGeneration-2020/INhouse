import React from 'react'
import axios from 'axios';
import { TextField } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom'
import classes from './Auth.module.scss'
import { useForm } from '../../helpers/Hooks/UseForm';
import { strategy } from './strategy';
import { GreenButton } from '../../styles/buttons';

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
