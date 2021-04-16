import * as React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {useHistory} from 'react-router-dom'

import {useAppState, useClient} from 'context/auth-context'
import translations from 'translations'

function SelectScreen({setSelectedAppliance}) {
  const [appliances, setAppliances] = React.useState([])
  const client = useClient()
  const {language} = useAppState()
  const history = useHistory()

  React.useEffect(() => {
    client('api/homeappliances')
      .then(response => setAppliances(response.data.homeappliances))
      .catch(error => console.log(error))
  }, [client])

  return (
    <div className="flex min-h-screen items-center text-gray-700 bg-indigo-50">
      <div className="w-full max-w-md mx-auto bg-gray-200 rounded p-5 shadow-xl">
        <Formik
          initialValues={{appliance: ''}}
          onSubmit={values => {
            const selectedApplianceName = values.appliance.substr(
              0,
              values.appliance.indexOf('(') - 1,
            )

            const selectedApplianceObj = appliances.filter(
              obj => obj.name === selectedApplianceName,
            )
            console.log(selectedApplianceObj[0])
            setSelectedAppliance(selectedApplianceObj[0])
            history.push('/dashboard')
          }}
        >
          <Form>
            <label
              className="block mb-1 text-gray-700 text-center"
              htmlFor="appliance"
            >
              {translations.applianceSelectOvenSelectLabel[language]}
            </label>
            <Field
              as="select"
              name="appliance"
              className="block text-center my-4 w-full bg-gray-50 h-8 rounded shadow border-b-2 border-blue-300"
            >
              <option hidden>
                {translations.applianceSelectDropdownDefault[language]}
              </option>
              {appliances.map(happliance => {
                if (happliance.type === 'Oven') {
                  return (
                    <option key={happliance.name}>
                      {`${happliance.name} (${happliance.brand} ${happliance.type})`}
                    </option>
                  )
                }
                return null
              })}
            </Field>
            <ErrorMessage name="appliance" component="div" />
            <button
              type="submit"
              className="w-full bg-blue-200 hover:bg-blue-300 font-bold py-2 px-4 my-2 rounded active:bg-blue-200 cursor-pointer"
            >
              {translations.applianceSelectSelectButton[language]}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export {SelectScreen}
