const express = require('express');

const userRouter = require('./routes/users');
// const languageRouter = require('./routes/language');

const app = express();
app.use(express.json());

app.use(userRouter);
// app.use(languageRouter);

app.get('/', (req, res) => {
  res.status(200).json('Hello world from Conversa');
});

module.exports = app;
