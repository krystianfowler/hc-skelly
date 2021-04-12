import * as React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {AppProvider} from './auth-context'

function AppProviders({children}) {
  return (
    <Router>
      <AppProvider>{children}</AppProvider>
    </Router>
  )
}

export {AppProviders}
