const express = require('express');

const connectionRouter = express.Router();
const { findUser } = require('../controllers/connections');

connectionRouter.get('/connections', findUser);

module.exports = connectionRouter;
