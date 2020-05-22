import find from 'lodash/find'
import capitalize from 'lodash/capitalize'
import isPlainObject from 'lodash/isPlainObject'
import map from 'lodash/map'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import reduce from 'lodash/reduce'
import get from 'lodash/get'

function encodeQueryData (data) {
  let ret = []
  for (let d in data) {
    if (encodeURIComponent(data[d]) !== 'undefined') {
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]))
    }
  }
  return ret.join('&')
}

function cleanObject (obj = {}) {
  if (isNumber(obj)) return obj
  if (isString(obj)) {
    return (obj.trim().length === 0) ? null : obj
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return null
    if (obj.length === 1) {
      if (isString(obj[0])) {
        return (obj[0] === '') ? null : obj[0]
      } else {
        return cleanObject(obj[0])
      }
    }
    return map(obj, cleanObject)
  } else if (isPlainObject(obj)) {
    return reduce(obj, (acum, value, key) => {
      return {
        ...acum,
        [key]: cleanObject(value)
      }
    }, {})
  }
}

function findIn (catalog, id) {
  const parsedInt = parseInt(id, 10)
  if (!isNaN(parsedInt)) {
    return get(find(catalog, item => item.value === parsedInt), 'label', parsedInt)
  } else if (typeof id === 'string' || typeof id === 'boolean') {
    return get(find(catalog, item => item.value === id), 'label', id)
  }
}

export default {
  encodeQueryData,
  decodeJWT (token) {
    const tokenData = token.split('.')
    const decodedData = JSON.parse(atob(tokenData[1]))
    return decodedData
  },

  urlQueryData (url, queryParams) {
    if (typeof queryParams === 'object') {
      if (Object.keys(queryParams).length === 0) return url
      if (url.includes('?')) return url + encodeQueryData(queryParams)
      return url + '?' + encodeQueryData(queryParams)
    } else if (typeof queryParams === 'string') {
      return url + '?' + queryParams
    } else {
      return url
    }
  },
  nameTransform (str = '') {
    let result
    if (typeof str === 'string') {
      result = str ? str.replace(/\w\S*/g, (txt) => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() }) : ''
    } else {
      result = ''
    }
    return result
  },
  textTransform (str = '') {
    return (str && typeof str === 'string') ? capitalize(upperCase(str)) : str
  },
  cleanObject,
  findIn
}
