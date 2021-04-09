import * as React from 'react'
import PropTypes from 'prop-types'

const localStorageKey = '__hc_skelly_state__'

const AppStateContext = React.createContext()

const AppDispatchContext = React.createContext()

const appReducer = (state, action) => {
  switch (action.type) {
    case 'storeToken': {
      return {...state, accessToken: action.payload}
    }

    case 'storeClientId': {
      return {...state, clientId: action.payload}
    }

    case 'storeClientSecret': {
      return {...state, clientSecret: action.payload}
    }

    case 'removeToken': {
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

const AppProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(appReducer, {}, () => {
    const localData = localStorage.getItem(localStorageKey)
    return localData ? JSON.parse(localData) : {}
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

AppProvider.propTypes = {
  children: PropTypes.node,
}

AppProvider.defaultProps = {
  children: null,
}

const useAppState = () => {
  const context = React.useContext(AppStateContext)

  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider')
  }

  return context
}

const useAppDispatch = () => {
  const context = React.useContext(AppDispatchContext)

  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppProvider')
  }

  return context
}

export {AppProvider, useAppState, useAppDispatch}
