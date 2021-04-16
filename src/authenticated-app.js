import * as React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import {SelectScreen} from 'screens/SelectScreen'

function AuthenticatedApp() {
  const [appliance, setAppliance] = React.useState()

  const setSelectedAppliance = appliance => setAppliance(appliance)

  return (
    <Switch>
      <Route exact path="/select">
        <SelectScreen setSelectedAppliance={setSelectedAppliance} />
      </Route>
      <Route exact path="/dashboard">
        <StatusScreen appliance={appliance} />
        <ProgramScreen appliance={appliance} />
      </Route>
      <Route>
        <Redirect to="/select" />
      </Route>
    </Switch>
  )
}

function StatusScreen({appliance}) {
  return <h1>StatusScreen {appliance}</h1>
}
function ProgramScreen() {
  return <h1>ProgramScreen</h1>
}

export default AuthenticatedApp
