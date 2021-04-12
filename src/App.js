import * as React from 'react'

import UnauthenticatedApp from './unauthenticated-app'
import AuthenticatedApp from './authenticated-app'
import {useAppState} from './context/auth-context'

function App() {
  const {accessToken} = useAppState()
  return accessToken ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default App
