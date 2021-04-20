import * as React from 'react'

import {client} from 'util/api-client'
import {toast} from 'util/toast'
import translations from 'translations'

const localStorageKey = '__hc_skelly_state__'

const AppStateContext = React.createContext()

const AppDispatchContext = React.createContext()

const defaultState = {
  language: 'en-GB',
}

function appReducer(state, action) {
  switch (action.type) {
    case 'storeClientIdAndSecret': {
      return {
        ...state,
        clientId: action.payload.clientId,
        clientSecret: action.payload.clientSecret,
      }
    }
    case 'storeAccessAndRefreshTokens': {
      return {
        ...state,
        accessToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
      }
    }

    case 'clearState': {
      return {}
    }

    case 'setLanguageEnglish': {
      return {...state, language: 'en-GB'}
    }

    case 'setLanguageDeutsch': {
      return {...state, language: 'de-DE'}
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function AppProvider({children}) {
  const [state, dispatch] = React.useReducer(appReducer, {}, () => {
    const localData = localStorage.getItem(localStorageKey)
    return localData ? JSON.parse(localData) : defaultState
  })

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state))
  })

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

function useAppState() {
  const context = React.useContext(AppStateContext)

  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider')
  }

  return context
}

function useAppDispatch() {
  const context = React.useContext(AppDispatchContext)

  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppProvider')
  }

  return context
}

function useClient() {
  const {accessToken, language, refreshToken, clientSecret} = useAppState()
  const dispatch = useAppDispatch()

  return React.useCallback(
    (endpoint, config) =>
      client(endpoint, {...config, accessToken, language}).catch(error => {
        // Handle expired access token
        if (error.error.key === 'invalid_token') {
          client('security/oauth/token', {
            formData: {
              grant_type: 'refresh_token',
              refresh_token: refreshToken,
              client_secret: clientSecret,
            },
          })
            .then(response => {
              dispatch({type: 'storeAccessAndRefreshTokens', payload: response})
              toast.success(translations.refreshTokenSuccessToast[language])
              // Continue with original request
              return client(endpoint, {
                ...config,
                accessToken: response.access_token,
                language,
              })
            })
            .catch(error => {
              console.log(translations.refreshTokenFailToast[language])
              Promise.reject(error)
            })
        }
        return Promise.reject(error)
      }),
    [accessToken, language, refreshToken, clientSecret, dispatch],
  )
}

export {AppProvider, useAppState, useAppDispatch, useClient}
