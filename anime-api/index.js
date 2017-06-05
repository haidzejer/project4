const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  usersRoutes = require('./routes/users.js')

  const port = 3001

  app.get('/', (err) => {
    console.log("hello")
  })

  app.use('/api/users', usersRoutes)

  app.listen(port, err => {
    console.log(err || "You are connected to port:", port)
  })
