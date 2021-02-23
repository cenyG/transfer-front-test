import React from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import { SnackbarProvider } from 'notistack'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import LogIn from './screens/LogIn'
import User from './screens/User'
import theme from './theme'

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={5}>
        <Router>
          <Switch>
            <Route path="/home">
              <User/>
            </Route>
            <Route path="/login">
              <LogIn/>
            </Route>
            <Route path="/">
              <LogIn/>
            </Route>
          </Switch>
        </Router>
      </SnackbarProvider>
    </MuiThemeProvider>
  )
}

export default App
