const v4 = require('uuid/v4')
const { minToMs } = require('./utils')

const SESSION_EXPIRES_IN = minToMs(1)

const SessionManager = (function () {
  const sessions = new Set()

  const createSession = () => {
    const newSession = v4()

    sessions.add(newSession)
    setTimeout(() => removeSession(newSession), SESSION_EXPIRES_IN)

    return newSession
  }

  const removeSession = session => {
    sessions.delete(session)
  }

  const isValidSession = session => sessions.has(session)

  return {
    createSession,
    removeSession,
    isValidSession
  }
}())

module.exports = SessionManager
