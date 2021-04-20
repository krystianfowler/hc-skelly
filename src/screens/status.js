import * as React from 'react'
import {IoMdCheckmark, IoMdClose} from 'react-icons/io'
import {useHistory} from 'react-router-dom'

import {Oven} from 'components/oven'
import {ProgressBar} from 'components/lib'
import {useAppState, useClient} from 'context/auth-context'
import {useEventSource} from 'util/event-source'
import {toast} from 'util/toast'
import translations from 'translations'

function StatusScreen({appliance}) {
  const {
    powerState,
    operationState,
    doorState,
    remoteControlActive,
    setpointTemperature,
    activeProgram,
    programDuration,
    remainingProgramTime,
    programProgress,
  } = useEventSource(appliance.haId)
  const {language} = useAppState()
  const history = useHistory()
  const client = useClient()

  const stopProgram = () => {
    client(`api/homeappliances/${appliance.haId}/programs/active`, {
      method: 'DELETE',
    })
      .then(response => toast.success('Program stopped'))
      .catch(error => toast.error(error))
  }

  return (
    <>
      <div className="absolute top-1 left-1 z-50 bg-gray-800 text-white py-1 px-3 rounded-2xl">
        <button
          className="hover:text-yellow-400"
          type="button"
          onClick={() => history.push('/select')}
        >
          {translations.applianceControlChangeOvenButton[language]}
        </button>
      </div>
      <div className="h-40 sm:h-screen sm:w-1/3 bg-gray-200 rounded border shadow-2xl">
        <div className="text-center mt-20">
          <p className="font-bold text-lg">
            {appliance.name} ({appliance.brand} {appliance.type})
          </p>
          <p className="text-xs">{appliance.haId}</p>
          <p>
            {translations.applianceStatusViewPowerState[language]}: {powerState}
          </p>
          <p>
            {translations.applianceStatusViewOperationState[language]}:{' '}
            {operationState}
          </p>
          <p>
            {translations.applianceStatusViewDoorState[language]}: {doorState}
          </p>
          <p>
            {translations.applianceStatusViewRemoteControlActive[language]}:{' '}
            {remoteControlActive ? (
              <IoMdCheckmark className="inline h-6 w-6 text-green-500" />
            ) : (
              <IoMdClose className="inline h-6 w-6 text-red-500" />
            )}
          </p>
          <Oven programActive={activeProgram} operationState={operationState} />
          {activeProgram && operationState !== 'Completed' ? (
            <>
              <p>
                {activeProgram} {language === 'en-GB' ? 'at' : 'bei'}{' '}
                {setpointTemperature} {language === 'en-GB' ? 'for' : 'für'}{' '}
                {programDuration}
              </p>
              <ProgressBar progress={programProgress} />
              <p>
                {translations.applianceStatusViewRemainingProgramTime[language]}
                : {remainingProgramTime}
              </p>
              <button
                type="button"
                className="bg-red-300 hover:bg-red-400 rounded px-5 py-3 mt-2 font-semibold"
                onClick={stopProgram}
              >
                {translations.applianceStatusViewStopProgramButton[language]}
              </button>
            </>
          ) : null}
          {operationState === 'Completed' ? (
            <p>
              Program complete, please accept the notification in the Home
              Connect app before proceeding
            </p>
          ) : null}
        </div>
      </div>
    </>
  )
}

export {StatusScreen}
