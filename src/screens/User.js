import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Container, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack'
import Api from '../api'


const User = () => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const api = new Api()

  const [userState, setUserState] = useState({
    id: 0,
    name: '',
    amount: ''
  })
  const [transferAmount, setTransferAmount] = useState(0)
  const [toAccountId, setToAccountId] = useState(0)

  useEffect(() => {
    api
    .account()
    .then(({ data: { id, amount, name }, status }) => {
      if (status === 200) {
        setUserState({
          id,
          name,
          amount
        })
      }
    })
    .catch((err) => {
      enqueueSnackbar(`Something went wrong: ${err.message}`, { variant: 'error' })
    })
  }, [])


  const transferAction = () => {
    api
    .transfer(userState.id, toAccountId, transferAmount)
    .then(({ data: { id, amount, name } }) => {
      enqueueSnackbar('Transfer success', { variant: 'success' })
      setUserState({
        id,
        name,
        amount
      })
    })
    .catch((err) => {
      enqueueSnackbar(`Transfer error: ${err.message}`, { variant: 'error' })
    })
  }

  const handleAmountChange = (event) => { setTransferAmount(event.target.value) }
  const handleToAccountIdChange = (event) => { setToAccountId(event.target.value) }


  return (
    <Container className={classes.root}>
      <Container className={classes.root}>
        <Typography variant="h4">Hi, {userState.name}</Typography>
        <Typography variant="h5">You have, {parseFloat(userState.amount).toFixed(3)}$</Typography>
      </Container>

      <Typography variant="h5">Transfer</Typography>

      <Container className={classes.transferForm}>

        <TextField className={classes.innerContainer}
          type="number"
          value={toAccountId}
          onChange={handleToAccountIdChange}
          label="Account ID"/>
        <TextField className={classes.innerContainer}
          type="number"
          value={transferAmount}
          onChange={handleAmountChange}
          label="Amount"/>
        <Button className={classes.innerContainer} variant="contained" onClick={transferAction} color="primary">Submit</Button>
      </Container>
    </Container>

  )
}

export default User

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    padding: '50px'
  },
  greeting: {
    padding: '50px'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: '10px',
    padding: '10px',
  },
  transferForm: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
    padding: '10px',
    maxWidth: '400px'
  },
  innerContainer: {
    padding: '10px'
  },
  header: {
    marginBottom: '20px',
    fontSize: 20,
    fontWeight: 'bold'
  },
  card: {
    minWidth: '400px'
  }
}))