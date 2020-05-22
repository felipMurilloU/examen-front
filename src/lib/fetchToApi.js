import merge from 'lodash/merge'

import store from '@/store'
import router from '@/router'
import errorMessages from '@/constants/errorMessages'

import utils from '@/lib/utils'

const API_URL = process.env.VUE_APP_API_URL

const BAD_REQUEST_HTTP_STATUS = 400
const UNAUTHORIZED_HTTP_STATUS = 401
const SERVER_ERROR_HTTP_STATUS = 500

export default async function fetchToApi (url, options = {}, apiAlternative = null) {
  const { errors = [], query = {}, ...fetchOptions } = options
  const formattedUrl = utils.urlQueryData(`${apiAlternative || API_URL}/${url}`, query)
  const response = await fetch(formattedUrl, merge({
    headers: {
      authorization: sessionStorage.getItem('access-token')
    }
  }, fetchOptions))
  const contentType = response.headers.get('content-type')

  if (contentType && contentType.includes('application/json')) {
    const body = await response.json()
    const errorMessage = errors.find(error => error.code === response.status)
    if (errorMessage) throw new Error((errorMessage.message !== 'default') ? errorMessage.message : body.message)

    switch (response.status) {
      case UNAUTHORIZED_HTTP_STATUS:
        if (body.sessionExpired) {
          sessionStorage.removeItem('access-token')
          store.dispatch('addTemporalNotification', {
            type: 'danger',
            message: errorMessages.sessionExpired
          })
          router.push({ name: 'sign-in', query: { redirect: router.currentRoute.fullPath } })
          throw new Error(errorMessages.sessionExpired)
        } else {
          throw new Error(errorMessages.unauthorized)
        }
      case BAD_REQUEST_HTTP_STATUS:
        throw new Error(errorMessages.badRequest)
      case SERVER_ERROR_HTTP_STATUS:
        throw new Error(errorMessages.errorRequest)
      default:
        break
    }

    return body
  } else {
    return response
  }
}
