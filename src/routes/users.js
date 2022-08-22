const express = require('express');

const userRouter = express.Router();
const {
  createUser,
  findUserByPk,
  findUsersByName,
  findAllUsers,
  updateUser,
  updateUserLang,
  updateUserDesiredLang,
  updateUserComp,
  deleteUser
} = require('../controllers/users');

userRouter.post('/users', createUser);
userRouter.get('/users', findAllUsers);
userRouter.get('/users/:firstName', findUsersByName);
userRouter.get('/users/:userId', findUserByPk);
userRouter.patch('/users/:userId', updateUser);
userRouter.delete('/users/:userId', deleteUser);
userRouter.patch('/users/:userId/nativeLang', updateUserLang);
userRouter.patch('/users/:userId/desiredLang', updateUserDesiredLang);
userRouter.patch('/users/:userId/desiredLang/competency', updateUserComp);
userRouter.delete('/users/:userId', deleteUser);

module.exports = userRouter;
