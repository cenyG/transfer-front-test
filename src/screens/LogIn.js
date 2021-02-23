import React from 'react'
import { useState } from 'react'
import { Button, Container, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import Api from '../api'
import config from '../config'

const useStyles = makeStyles(() => ({
  wrap: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '250px',
    textAlign: 'center'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10px',
  },
  button: {
    width: 100
  },
  success: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    alignItems: 'center',
    alignContent: 'center',
  },
  errorMessage: {
    color: 'red'
  }
}))

const LogIn = () => {
  const classes = useStyles()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const api = new Api()

  const [signUp, setSignUp] = useState(false)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const signInAction = () => {
    api
    .login({ name, password })
    .then(({ data, status }) => {
      if (status === 200) {
        localStorage.setItem(config.LOCAL_STORAGE_NAME, data)
        history.push('/home')
      } else {
        enqueueSnackbar(`Sign in problem: ${data}`, { variant: 'warning' })
      }
    })
    .catch(err => {
      enqueueSnackbar(`Sign in error: ${err.message}`, { variant: 'error' })
    })
  }

  const registerAction = () => {
    api
    .register({ name, password })
    .then(({ data, status }) => {
      if (status === 201) {
        enqueueSnackbar('Register success', { variant: 'success' })
      } else {
        enqueueSnackbar(`Register problem: ${data}`, { variant: 'warning' })
      }
    })
    .catch(err => {
      enqueueSnackbar(`Register error: ${err.message}`, { variant: 'error' })
    })
  }

  return (
    <Container className={classes.wrap}>
      <Container className={classes.root}>
        <TextField
          id="standard-basic"
          label="Username"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <TextField
          id="standard-basic"
          label="Password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        {
          signUp ? (
            <Container className={classes.buttons}>
              <Button
                className={classes.button}
                variant="contained"
                disableElevation
                onClick={registerAction}
                color="primary">Register</Button>
              <Button
                className={classes.button}
                onClick={() => setSignUp(false)}>Sign In</Button>
            </Container>
          ) : (
            <Container className={classes.buttons}>
              <Button variant="contained"
                disableElevation
                onClick={signInAction}
                color="primary">Sign In</Button>
              <Button onClick={() => setSignUp(true)}>Register</Button>
            </Container>
          )
        }
      </Container>
    </Container>
  )
}

export default LogIn