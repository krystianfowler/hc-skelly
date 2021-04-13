import * as React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

function AuthenticatedApp() {
  return (
    <Switch>
      <Route exact path="/select" component={SelectScreen} />
      <Route exact path="/dashboard">
        <StatusScreen />
        <ProgramScreen />
      </Route>
      <Route>
        <Redirect to="/select" />
      </Route>
    </Switch>
  )
}

function SelectScreen() {
  return <h1>ApplianceSelectScreen</h1>
}

function StatusScreen() {
  return <h1>StatusScreen</h1>
}
function ProgramScreen() {
  return <h1>ProgramScreen</h1>
}

export default AuthenticatedApp
