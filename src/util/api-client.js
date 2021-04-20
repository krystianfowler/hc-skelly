import qs from 'qs'

const apiURL = process.env.REACT_APP_API_URL

async function client(
  endpoint,
  {
    data,
    formData,
    accessToken,
    language,
    headers: customHeaders,
    ...customConfig
  } = {},
) {
  const config = {
    method: data || formData ? 'POST' : 'GET',
    body: data
      ? JSON.stringify(data)
      : formData
      ? qs.stringify(formData)
      : undefined,
    headers: {
      'Content-Type': data
        ? 'application/json'
        : formData
        ? 'application/x-www-form-urlencoded'
        : undefined,
      'Accept-Language': language,
      ...(Boolean(accessToken) && {Authorization: `Bearer ${accessToken}`}),
      ...customHeaders,
    },
    ...customConfig,
  }

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    if (response.status === 204) {
      return response
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}
