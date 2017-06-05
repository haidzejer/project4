const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  usersRoutes = require('./routes/users.js'),
  mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/anime'

  const port = 3001

  //
  mongoose.connect(mongoUrl, (err) => {
    console.log(err || "Connected to MongoDB.")
  })

  app.get('/', (err) => {
    console.log("hello")
  })

  app.use('/api/users', usersRoutes)

  app.listen(port, err => {
    console.log(err || "You are connected to port:", port)
  })
