import * as React from 'react'
import {Switch, Route} from 'react-router-dom'

import {AuthForm} from 'components/auth-form'
import {LanguagePicker} from 'components/language-picker'
import {FullPageSpinner} from 'components/lib'
import {useAppDispatch, useAppState} from 'context/auth-context'
import {client} from 'util/api-client'

function UnauthenticatedApp() {
  return (
    <Switch>
      <Route exact path="/authorize" component={APIRedirectLandingScreen} />

      <Route path="/" component={AuthScreen} />
    </Switch>
  )
}

function AuthScreen() {
  return (
    <div className="flex min-h-screen bg-indigo-50 text-gray-700">
      <LanguagePicker />
      <AuthForm />
    </div>
  )
}

function APIRedirectLandingScreen() {
  const params = new URLSearchParams(window.location.search)
  const authorizationCode = params.get('code')
  console.log(authorizationCode)

  const {clientId, clientSecret} = useAppState()
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (authorizationCode) {
      const config = {
        formData: {
          grant_type: 'authorization_code',
          code: authorizationCode,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: `${process.env.REACT_APP_URL}/authorize`,
        },
      }
      client('security/oauth/token', config)
        .then(response => {
          dispatch({type: 'storeAccessAndRefreshTokens', payload: response})
          //Move user to authenticated app
          window.location.assign(process.env.REACT_APP_URL)
        })
        .catch(error => console.log(error))
    }
  }, [authorizationCode, clientId, clientSecret, dispatch])

  return (
    <div className="flex min-h-screen bg-indigo-50 text-gray-700">
      <FullPageSpinner />
    </div>
  )
}

export default UnauthenticatedApp
