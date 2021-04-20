import * as React from 'react'
import {useHistory} from 'react-router-dom'

import {ProgramForm} from 'components/program-form'
import {Spinner} from 'components/lib'
import {useAppState, useClient} from 'context/auth-context'
import {toast} from 'util/toast'
import translations from 'translations'

function ProgramScreen({appliance}) {
  const [programs, setPrograms] = React.useState(null)

  const client = useClient()
  const {language} = useAppState()
  const history = useHistory()

  React.useEffect(() => {
    client(`api/homeappliances/${appliance.haId}/programs/available`)
      .then(response => {
        setPrograms(response.data.programs)
        toast.success(translations.programSuccessToast[language])
      })
      .catch(error => {
        toast.error(error.error.description)
        history.push('/dashboard')
      })
  }, [appliance.haId, client, language, history])

  return (
    <div className="bg-indigo-50 flex-grow flex">
      <div className="w-auto sm:w-full h-full sm:h-auto m-auto flex flex-col sm:flex-row justify-evenly ">
        {programs ? (
          <ProgramForm programs={programs} haId={appliance.haId} />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  )
}

export {ProgramScreen}
