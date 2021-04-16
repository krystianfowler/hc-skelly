import * as React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import {SelectScreen} from 'screens/SelectScreen'
import {StatusScreen} from 'screens/StatusScreen'
import {LogoutButton} from 'components/lib'

function AuthenticatedApp() {
  const [appliance, setAppliance] = React.useState()

  const setSelectedAppliance = appliance => setAppliance(appliance)

  return (
    <>
      <LogoutButton />
      <Switch>
        <Route exact path="/select">
          <SelectScreen setSelectedAppliance={setSelectedAppliance} />
        </Route>
        {appliance ? (
          <Route exact path="/dashboard">
            <div className="flex flex-col flex-nowrap min-h-screen sm:flex-row text-gray-700 bg-indigo-50">
              <StatusScreen appliance={appliance} />
              <ProgramScreen appliance={appliance} />
            </div>
          </Route>
        ) : null}
        <Route>
          <Redirect to="/select" />
        </Route>
      </Switch>
    </>
  )
}

function ProgramScreen() {
  return <h1>ProgramScreen</h1>
}

export default AuthenticatedApp
