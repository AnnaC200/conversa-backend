const { Router } = require('express')
const userController = require('../controllers/user')

const router = Router()

router.post("/", userController.create)

router.get('/', userController.read)

router.get('/:userId', userController.readById)

router.patch('/:userId', userController.update)

module.exports = router

