const
  express = require('express'),
  usersRouter = new express.Router()


usersRouter.port('/users', (req, res) => {
  User.create(req.body, (err, user) => {
    const userData.toObject()
    delete userData.password

    const token = serverAuth.createToken(userData)
    res.json({success: true, message: "User account created.", user, token})
  })
})
