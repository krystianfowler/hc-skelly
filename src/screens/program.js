import * as React from 'react'

import {ProgramForm} from 'components/program-form'
import {Spinner} from 'components/lib'
import {useClient} from 'context/auth-context'
import {toast} from 'util/toast'

function ProgramScreen({appliance}) {
  const [programs, setPrograms] = React.useState(null)

  const client = useClient()

  React.useEffect(() => {
    client(`api/homeappliances/${appliance.haId}/programs/available`)
      .then(response => {
        setPrograms(response.data.programs)
        toast.success('Available oven programs pulled from API')
      })
      .catch(error => toast.error(error.error.description))
  }, [appliance.haId, client])

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
