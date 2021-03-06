const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  usersRoutes = require('./routes/users.js'),
  mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost/anime',
  cors = require('cors'),
  server = require('http').Server(app),
  io = require('socket.io')(server),
  dotenv = require('dotenv').load({silent: true})

  const port = process.env.PORT || 3001


  mongoose.connect(mongoUrl, (err) => {
    console.log(err || "Connected to MongoDB.")
  })

  app.use(logger('dev'))
  app.use(cors())
  app.use(bodyParser.json())

  app.get('/', (req, res) => {
    console.log("hello")
    res.json("Hi")
  })

  app.use('/api/users', usersRoutes)

  io.on('connection', (socket) => {
    console.log("client connection!");
    socket.on('chat-message', (message) => {
      io.emit('new-message', message)
    })
  })

  server.listen(port, err => {
    console.log(err || "You are connected to port:", port)
  })
