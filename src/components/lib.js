import * as React from 'react'

import {useAppState, useAppDispatch} from 'context/auth-context'
import translations from 'translations'

function Spinner({size = 64}) {
  return (
    <div
      className={`loader animate-spin rounded-full border-8 border-t-8 border-gray-200 h-${size} w-${size} m-auto`}
    />
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

function ProgressBar({progress}) {
  return (
    <div className="shadow w-3/4 bg-gray-600 rounded mx-auto">
      <div
        className="bg-blue-400 text-xs leading-none py-1 text-center text-white rounded"
        style={{width: `${progress}%`}}
      >
        {progress}%
      </div>
    </div>
  )
}

export {Spinner, LogoutButton, ProgressBar}
