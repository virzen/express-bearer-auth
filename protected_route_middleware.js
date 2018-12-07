const SessionManager = require('./session_manager')
const { getSessionIdFromAuthHeader } = require('./utils')

const protectedRoute = (req, res, next) => {
  const sessionId = getSessionIdFromAuthHeader(req.headers.authentication)

  if (!SessionManager.isValidSession(sessionId)) {
    res.status(401)
    res.send('Unauthorized')
  }

  next()
}

const logoutRoute = (req) => {
  const sessionId = getSessionIdFromAuthHeader(req.headers.authentication)
  SessionManager.removeSession(sessionId)
}

module.exports = {
  protectedRoute,
  logoutRoute
}