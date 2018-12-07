const express = require('express')
const app = express()
const SessionManager = require('./session_manager')
const protectedRouteMiddleware = require('./protected_route_middleware')

const PORT = 3000

app.get('/login', (req, res) => {
  if (req.query.password !== 'password') {
    res.status(401)
    res.send('Incorrect password')
    return
  }

  const newSession = SessionManager.createSession()

  res.status(200)
  res.send(newSession)
})

app.get('/protected', protectedRouteMiddleware, (_req, res) => {
  res.send('Protected page content')
}) 

app.listen(PORT, () => console.log(`Example app listening on http://localhost:${PORT}!`))