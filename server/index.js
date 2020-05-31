/* eslint-disable import/order */
const express = require('express');
const path = require('path');
const socketManager = require('./socketManager');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const cors = require('cors');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const chatsRoute = require('./routes/chats');


app.use(cors(), express.json());
app.use('/', express.static(path.join(__dirname, '../client/public')));
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/chats', chatsRoute);

const db = require('../db/index');

db();

io.on('connection', socketManager);

const PORT = 1000;


server.listen(PORT, () => {
  console.log(`listening on port ${PORT}!!!`);
});
