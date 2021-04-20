import * as React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {FaGithub} from 'react-icons/fa'

import {HomeConnectIcon} from 'components/hc-icon'
import {useAppDispatch, useAppState} from 'context/auth-context'
import translations from 'translations'

function AuthForm() {
  const {language} = useAppState()
  const dispatch = useAppDispatch()

  return (
    <div className="w-full max-w-lg m-auto bg-gray-200 rounded p-5 shadow-xl">
      <Formik
        initialValues={{clientId: '', clientSecret: ''}}
        validate={values => {
          const errors = {}
          if (values.clientId.length !== 64) {
            errors.clientId = translations.authPageClientIdError[language]
          }
          if (values.clientSecret.length !== 64) {
            errors.clientSecret =
              translations.authPageClientSecretError[language]
          }
          return errors
        }}
        onSubmit={values => {
          dispatch({type: 'storeClientIdAndSecret', payload: values})

          window.location.href = `${process.env.REACT_APP_API_URL}/security/oauth/authorize?client_id=${values.clientId}&redirect_uri=${process.env.REACT_APP_URL}/authorize&response_type=code&scope=IdentifyAppliance%20Oven&accept_language=${language}`
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <label className="block mb-1 text-gray-700" htmlFor="clientId">
              Client ID
            </label>
            <Field
              as="input"
              name="clientId"
              className="w-full p-2 mb-1 text-gray-700 border-b-2 border-blue-300 outline-none bg-gray-50 rounded  shadow text-sm"
            />
            <ErrorMessage
              name="clientId"
              component="div"
              className="absolute text-xs text-red-500"
            />
            <label
              className="block mb-1 text-gray-700 mt-6"
              htmlFor="clientSecret"
            >
              Client Secret
            </label>
            <Field
              as="input"
              name="clientSecret"
              className="w-full p-2 mb-1 text-gray-700 border-b-2 border-blue-300 outline-none bg-gray-50 rounded  shadow text-sm"
            />
            <ErrorMessage
              name="clientSecret"
              component="div"
              className="absolute text-xs text-red-500"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-200 hover:bg-blue-300 font-bold py-2 px-4 my-6 rounded cursor-pointer"
            >
              {translations.authPageAuthorizeButton[language]}
            </button>
          </Form>
        )}
      </Formik>
      <footer>
        <a
          className="float-left text-xs"
          href="https://api-docs.home-connect.com/"
        >
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 rounded py-1 px-2"
          >
            <HomeConnectIcon /> Home Connect API docs
          </button>
        </a>
        <a
          className="float-right text-xs"
          href="https://github.com/nirzohu/hc-skelly"
        >
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 rounded py-2 px-3"
          >
            <FaGithub className="inline h-4 w-4" />{' '}
            {translations.authPageGithubButton[language]}
          </button>
        </a>
      </footer>
    </div>
  )
}

export {AuthForm}
