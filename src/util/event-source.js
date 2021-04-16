import * as React from 'react'
import {EventSourcePolyfill} from 'event-source-polyfill'

import {useAppState, useClient} from 'context/auth-context'

global.EventSource = EventSourcePolyfill

const initialState = {
  doorState: '',
  remoteControlActive: false,
  operationState: '',
  powerState: '',
  programDuration: '',
  remainingProgramTime: '',
  programProgress: 0,
  setpointTemperature: '',
  activeProgram: '',
}

function reducer(state, dataItem) {
  switch (dataItem.key) {
    case 'BSH.Common.Status.DoorState':
      return {...state, doorState: dataItem.displayvalue}
    case 'BSH.Common.Status.RemoteControlActive':
      return {...state, remoteControlActive: dataItem.value}
    case 'BSH.Common.Status.OperationState':
      return {...state, operationState: dataItem.displayvalue}
    case 'BSH.Common.Setting.PowerState':
      return {...state, powerState: dataItem.displayvalue}
    case 'BSH.Common.Option.Duration':
      return {...state, programDuration: `${dataItem.value} ${dataItem.unit}`}
    case 'BSH.Common.Option.RemainingProgramTime':
      return {
        ...state,
        remainingProgramTime: `${dataItem.value} ${dataItem.unit}`,
      }
    case 'BSH.Common.Option.ProgramProgress':
      return {...state, programProgress: dataItem.value}
    case 'Cooking.Oven.Option.SetpointTemperature':
      return {
        ...state,
        setpointTemperature: `${dataItem.value} ${dataItem.unit}`,
      }
    case 'BSH.Common.Root.ActiveProgram':
      if (dataItem.displayvalue === '') {
        return {
          ...state,
          activeProgram: '',
          programDuration: '',
          remainingProgramTime: '',
          programProgress: 0,
        }
      }
      return {...state, activeProgram: dataItem.displayvalue}

    case 'BSH.Common.Event.ProgramFinished':
      //   toast.success(item.name)
      return state

    default:
      return state
  }
}

function useEventSource(applianceHaId) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const client = useClient()

  const {accessToken, language} = useAppState()

  React.useEffect(() => {
    client(`api/homeappliances/${applianceHaId}/status`)
      .then(res => {
        const data = res.data.status
        data.forEach(item => dispatch(item))
      })
      .catch(err => console.log(err))

    client(`api/homeappliances/${applianceHaId}/settings`)
      .then(res => {
        const data = res.data.settings
        data.forEach(item => dispatch(item))
      })
      .catch(err => console.log(err))

    client(`api/homeappliances/${applianceHaId}/programs/active`)
      .then(res => {
        const programName = res.data.name
        dispatch({
          key: 'BSH.Common.Root.ActiveProgram',
          displayvalue: programName,
        })
        const data = res.data.data.options
        data.forEach(item => dispatch(item))
      })
      .catch(err => {
        if (err.key === 'SDK.Error.NoProgramActive') {
          dispatch({key: 'BSH.Common.Root.ActiveProgram', displayvalue: ''})
        }
      })

    const eventSource = new EventSourcePolyfill(
      `${process.env.REACT_APP_API_URL}/api/homeappliances/${applianceHaId}/events`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'text/event-stream',
          'Accept-Language': language,
        },
        heartbeatTimeout: 60000,
      },
    )

    const handleEvent = event => {
      if (event.data) {
        const data = JSON.parse(event.data).items
        data.forEach(item => dispatch(item))
      }
    }

    eventSource.addEventListener('open', () => console.log('OPEN!'), false)
    eventSource.addEventListener('KEEP-ALIVE', handleEvent, false)
    eventSource.addEventListener('STATUS', handleEvent, false)
    eventSource.addEventListener('NOTIFY', handleEvent, false)
    eventSource.addEventListener('EVENT', handleEvent, false)

    return () => {
      eventSource.removeEventListener('KEEP-ALIVE', handleEvent, false)
      eventSource.removeEventListener('STATUS', handleEvent, false)
      eventSource.removeEventListener('NOTIFY', handleEvent, false)
      eventSource.removeEventListener('EVENT', handleEvent, false)
    }
  }, [accessToken, applianceHaId, client, language])

  return state
}

export {useEventSource}
