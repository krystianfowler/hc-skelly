import * as React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import {SelectScreen} from 'screens/select'
import {StatusScreen} from 'screens/status'
import {DashboardScreen} from 'screens/dashboard'
import {ProgramScreen} from 'screens/program'
import {Toast} from 'components/toast'
import {LogoutButton} from 'components/lib'

function AuthenticatedApp() {
  const [appliance, setAppliance] = React.useState()

  const setSelectedAppliance = appliance => setAppliance(appliance)

  return (
    <>
      <Toast />
      <LogoutButton />
      <Switch>
        <Route exact path="/select">
          <SelectScreen setSelectedAppliance={setSelectedAppliance} />
        </Route>
        {appliance ? (
          <Route path="/dashboard">
            <div className="flex flex-col flex-nowrap min-h-screen sm:flex-row text-gray-700 bg-indigo-50">
              <StatusScreen appliance={appliance} />
              <Route exact path="/dashboard">
                <DashboardScreen />
              </Route>
              <Route exact path="/dashboard/program">
                <ProgramScreen appliance={appliance} />
              </Route>
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

export default AuthenticatedApp
