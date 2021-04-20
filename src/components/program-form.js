import * as React from 'react'
import {useFormik} from 'formik'
import {useHistory} from 'react-router-dom'

import {useClient} from 'context/auth-context'
import {toast} from 'util/toast'

function ProgramForm({programs, haId}) {
  const [tempOptions, setTempOptions] = React.useState()
  const [durationOptions, setDurationOptions] = React.useState()
  const [disabled, setDisabled] = React.useState(true)

  const client = useClient()
  const history = useHistory()

  const formik = useFormik({
    initialValues: {
      program: '',
      temperature: '',
      duration: '',
    },
    onSubmit: values => {
      const programKey = getProgramKey(formik.values.program, programs)

      const reqData = {
        key: programKey,
        options: [
          {
            key: 'Cooking.Oven.Option.SetpointTemperature',
            value: Number(
              formik.values.temperature.substr(
                0,
                formik.values.temperature.indexOf(' '),
              ),
            ),
            unit: tempOptions.unit,
          },
          {
            key: 'BSH.Common.Option.Duration',
            value:
              60 *
              Number(
                formik.values.duration.substr(
                  0,
                  formik.values.duration.indexOf(' '),
                ),
              ),
            unit: durationOptions.unit,
          },
        ],
      }

      client(`api/homeappliances/${haId}/programs/active`, {
        data: {data: reqData},
        method: 'PUT',
        headers: {
          'Content-Type': 'application/vnd.bsh.sdk.v1+json',
        },
      })
        .then(response => {
          toast.success('Program started')
          history.push('/dashboard')
        })
        .catch(error => {
          toast.error(error.error.description)
          history.push('/dashboard')
        })
    },
  })

  React.useEffect(() => {
    if (formik.values.program) {
      const programKey = getProgramKey(formik.values.program, programs)

      client(`api/homeappliances/${haId}/programs/available/${programKey}`)
        .then(response => {
          const options = response.data.options
          storeOptions(options)
          toast.success('Program options pulled from API')
          setDisabled(false)
        })
        .catch(error => toast.error(error.error.description))
    }
  }, [formik.values.program, programs, client, haId])

  function storeOptions(options) {
    for (const option of options) {
      if (option.key === 'Cooking.Oven.Option.SetpointTemperature') {
        setTempOptions({
          min: option.constraints.min,
          max: option.constraints.max,
          unit: option.unit,
        })
      } else if (option.key === 'BSH.Common.Option.Duration') {
        setDurationOptions({
          min: option.constraints.min,
          max: option.constraints.max,
          unit: option.unit,
        })
      }
    }
  }

  function renderTempOptions() {
    const {min, max, unit} = tempOptions
    const tempArr = []
    for (let temp = min; temp <= max; temp++) {
      tempArr.push(<option key={temp}>{`${temp} ${unit}`}</option>)
    }
    return tempArr
  }

  function renderDurationOptions() {
    const {max} = durationOptions
    const durArr = []
    let tempMax = max > 10800 ? 10800 : max
    for (let temp = 60; temp <= tempMax; temp += 60) {
      durArr.push(<option key={temp}>{`${temp / 60} min`}</option>)
    }
    return durArr
  }

  return (
    <div className="w-full max-w-lg m-auto bg-gray-200 rounded px-4 py-6 shadow-xl">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-rows-3 grid-cols-2 gap-5">
          <label htmlFor="program">Program</label>
          <select
            id="program"
            name="program"
            className="block w-full bg-gray-50 h-8 rounded shadow border-b-2 border-blue-300"
            onChange={formik.handleChange}
            value={formik.values.program}
          >
            <option hidden>Select a program</option>
            {programs.map(program => {
              return <option key={program.name}>{program.name}</option>
            })}
          </select>
          <label htmlFor="temperature">Temperature</label>
          <select
            id="temperature"
            name="temperature"
            className="block w-full bg-gray-50 h-8 rounded shadow border-b-2 border-blue-300"
            onChange={formik.handleChange}
            value={formik.values.temperature}
            disabled={disabled}
          >
            <option hidden>Select temperature</option>
            {disabled ? null : renderTempOptions()}
          </select>
          <label htmlFor="program">Duration</label>
          <select
            id="duration"
            name="duration"
            className="block w-full bg-gray-50 h-8 rounded shadow border-b-2 border-blue-300"
            onChange={formik.handleChange}
            value={formik.values.duration}
            disabled={disabled}
          >
            <option hidden>Select duration</option>
            {disabled ? null : renderDurationOptions()}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-300 hover:bg-green-400 font-bold py-2 px-4 mt-8 rounded active:bg-green-300"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

function getProgramKey(name, programs) {
  for (const program of programs) {
    if (name === program.name) {
      return program.key
    }
  }
}

export {ProgramForm}
