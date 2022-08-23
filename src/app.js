const express = require('express');
const connectionRouter = require('./routes/connections');
const cors = require('cors');

const userRouter = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(connectionRouter);

app.get('/', (req, res) => {
  res.status(200).json('Hello world from Conversa');
});

module.exports = app;
