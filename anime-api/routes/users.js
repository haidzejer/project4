const
  express = require('express'),
  usersRouter = new express.Router()


usersRouter.post('/api/users', (req, res) => {
  User.create(req.body, (err, user) => {
    const userData.toObject()
    delete userData.password

    const token = serverAuth.createToken(userData)
    res.json({success: true, message: "User account created.", user, token})
  })
})

usersRouter.route('/api/users/:id')
  .get((req, res) => {
    User.findById(req.params.id, (err, user) => {
      res.json(user)
    })
  })
  .patch((req, res) => {
    User.findById(res.params.id, (err, user) => {
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
