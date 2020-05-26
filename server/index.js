const express = require('express');
const path = require('path');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);

const PORT = 1000;
const io = socketIo(server);
const getApiAndEmit = async (socket) => {
  try {
    socket.emit('FROMAPI', 'yooooo');
  } catch (error) {
    console.error(error.message);
  }
};

app.use(cors());
app.use('/', express.static(path.join(__dirname, '../client/public')));

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
