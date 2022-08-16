const express = require('express')

const models = require('../models')
const userRouter = express.Router()
const { createUser, findUserByPk, findAllUsers } = require('../controllers/users')


userRouter.post('/user', createUser)
userRouter.get('/user/:userId', findUserByPk)
userRouter.get('/user', findAllUsers)

module.exports = userRouter


