const isString = require('lodash/isString')
const last = require('lodash/last')

const getSessionIdFromAuthHeader = (authHeader) => {
  if (!isString(authHeader)) {
    return ''
  }

  return last(authHeader.split(' '))
}

const minToMs = n => n * 1000 * 60

module.exports = {
  getSessionIdFromAuthHeader,
  minToMs
}