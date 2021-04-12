import * as React from 'react'
import {IoLanguage} from 'react-icons/io5'

import {useAppDispatch} from 'context/auth-context'
import {useDropdown} from 'util/hooks'

function LanguagePicker() {
  const [selected, Dropdown] = useDropdown(
    <>
      <IoLanguage className="h-6 w-6 inline" />
      Language
    </>,
    ['English', 'Deutsch'],
  )

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch({type: `setLanguage${selected}`})
  }, [selected, dispatch])

  return (
    <div className="absolute top-1 right-32 z-50 bg-gray-800 text-white py-1 px-3 rounded-2xl">
      <Dropdown />
    </div>
  )
}

export {LanguagePicker}
