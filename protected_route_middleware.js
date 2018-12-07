const SessionManager = require('./session_manager')
const { getSessionIdFromAuthHeader } = require('./utils')

const middleware = (req, res, next) => {
  const sessionId = getSessionIdFromAuthHeader(req.headers.authentication)

  if (!SessionManager.isValidSession(sessionId)) {
    res.status(401)
    res.send('Unauthorized')
  }

  next()
}

module.exports = middleware