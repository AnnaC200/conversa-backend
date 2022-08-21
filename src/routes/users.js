const express = require('express');

const userRouter = express.Router();
const {
  createUser,
  findUserByPk,
  findAllUsers,
  updateUser,
  updateUserLang,
  updateUserDesiredLang,
  updateUserComp,
  deleteUser
} = require('../controllers/users');

userRouter.post('/users', createUser);
userRouter.get('/users/:userId', findUserByPk);
userRouter.get('/users', findAllUsers);
userRouter.patch('/users/:userId', updateUser);
userRouter.patch('/users/:userId/nativeLang', updateUserLang);
userRouter.patch('/users/:userId/desiredLang', updateUserDesiredLang);
userRouter.patch('/users/:userId/desiredLang/competency', updateUserComp);
userRouter.delete('/users/:userId', deleteUser);

module.exports = userRouter;
