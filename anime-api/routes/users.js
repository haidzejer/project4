const
  express = require('express'),
  usersRouter = new express.Router(),
  User = require('../models/User.js'),
  serverAuth = require('../config/serverAuth.js')

usersRouter.post('/login', (req, res) => {
  User.findOne({email: req.body.email}, '+password', (err, user) => {

    if(!user || !user.validPassword(req.body.password)) {
      return res.status(403).json({success: false, message: "Your a failure"})
    }

    if(user && user.validPassword(req.body.password)) {
      const userData = user.toObject()
      delete userData.password

      const token = serverAuth.createToken(userData)
      res.json({token: token})
    }

  })
})

usersRouter.route('/')
  .get((req, res) => {
    User.find({}, (err, users) => {
      res.json(users)
    })
  })
  .post((req, res) => {
    User.create(req.body, (err, user) => {
      console.log(User);
      if(err) console.log(err)
      const userData = user.toObject()
      delete userData.password

      const token =   serverAuth.createToken(userData)
      res.json({success: true, message: "User account created.", user, token})
    })
  })

usersRouter.route('/:id')
  .get((req, res) => {
    User.findById(req.params.id, (err, user) => {
      res.json(user)
    })
  })
  .patch((req, res) => {
    User.findById(req.params.id, (err, user) => {
      if(err) return console.log(err)
      Object.assign(user, req.body)
      user.save((err) => {
        res.json({success: true, message: "User updated...", user: user})
      })
    })
  })
  .delete((req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
      if(err) return console.log(err)
      res.json({success: true, message: "User destroyed..."})
    })
  })

module.exports = usersRouter
