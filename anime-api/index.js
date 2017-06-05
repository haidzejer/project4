const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  logger = require('morgan')

  const port = 3001

  app.get('/', (err) => {
    console.log("hello")
  })

  app.listen(port, err => {
    console.log(err || "You are connected to port:", port)
  })
