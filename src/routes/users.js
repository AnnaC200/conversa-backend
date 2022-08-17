const express = require('express')

const models = require('../models')
const userRouter = express.Router()
const { createUser, findUserByPk, findAllUsers, updateUser } = require('../controllers/users')


userRouter.post('/users', createUser)
userRouter.get('/users/:userId', findUserByPk)
userRouter.get('/users', findAllUsers)
userRouter.patch('/users/:userId', updateUser)

module.exports = userRouter


