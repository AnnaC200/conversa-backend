const express = require('express');

const connectionRouter = express.Router();
const { findUser } = require('../controllers/connections');

connectionRouter.get('users/connections', findUser);

module.exports = connectionRouter;
