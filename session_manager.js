const v4 = require('uuid/v4')
const { minToMs } = require('./utils')
const { getSessionIdFromAuthHeader } = require('./utils')

const SESSION_EXPIRES_IN = minToMs(1)

const SessionManager = (function () {
  const sessions = new Set()

  const createSession = () => {
    const newSession = v4()

    sessions.add(newSession)
    setTimeout(() => sessions.remove(newSession), SESSION_EXPIRES_IN)

    return newSession
  }

  const isValidSession = session => sessions.has(session)

  const validateSession = (req, res) => {
    const sessionId = getSessionIdFromAuthHeader(req.headers.authentication)

    if (!isValidSession(sessionId)) {
      res.status(401)
      res.send('Unauthorized')
    }
  }

  return {
    createSession,
    validateSession,
  }
}())

module.exports = SessionManager
