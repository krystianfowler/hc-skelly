import * as React from 'react'
import {useHistory} from 'react-router-dom'

import translations from 'translations'
import {useAppState} from 'context/auth-context'

function DashboardScreen() {
  const {language} = useAppState()
  const history = useHistory()

  return (
    <div className="bg-indigo-50 flex-grow flex">
      <div className="w-auto sm:w-full h-full sm:h-auto m-auto flex flex-col sm:flex-row justify-evenly ">
        <button
          type="button"
          className="float-left bg-green-300 hover:bg-green-400 rounded px-6 py-5 font-semibold"
          onClick={() => history.push('/dashboard/program')}
        >
          {translations.selectActionViewRunProgramButton[language]}
        </button>
      </div>
    </div>
  )
}

export {DashboardScreen}
