/* eslint-disable import/order */
const express = require('express');
const path = require('path');
const socketIo = require('socket.io');
const cors = require('cors');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');

const app = express();


app.use(cors(), express.json());
app.use('/', express.static(path.join(__dirname, '../client/public')));
app.use('/auth', authRoute);
app.use('/users', userRoute);


const server = require('http').createServer(app);

const db = require('../db/index');

db();


const PORT = 1000;
const io = socketIo(server);
const getApiAndEmit = async (socket) => {
  try {
    socket.emit('FROMAPI', 'yooooo');
  } catch (error) {
    console.error(error.message);
  }
};

io.on('connection', (socket) => {
  console.log('new connection', setInterval(
    () => getApiAndEmit(socket),
    10000,
  ));
  socket.on('send', (data) => {
    io.emit('recieve message', data);
  });
  socket.on('disconnect', () => console.log('client disconnected'));
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}!!!`);
});
