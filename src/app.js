const express = require('express');

const userRouter = require('./routes/user');

const app = express();

app.use(express.json());

app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.status(200).json('Hello world from Conversa');
});

module.exports = app;
