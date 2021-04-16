import * as React from 'react'

import {useAppState, useAppDispatch} from 'context/auth-context'
import translations from 'translations'

function FullPageSpinner() {
  return (
    <div className="loader animate-spin rounded-full border-8 border-t-8 border-gray-200 h-64 w-64 m-auto" />
  )
}

function LogoutButton() {
  const dispatch = useAppDispatch()
  const {language} = useAppState()

  return (
    <div className="absolute top-1 right-1 z-50 bg-gray-800 text-white py-1 px-3 rounded-2xl hover:text-yellow-400">
      <button type="button" onClick={() => dispatch({type: 'clearState'})}>
        {translations.authorizedAppLogoutButton[language]}
      </button>
    </div>
  )
}

export {FullPageSpinner, LogoutButton}
