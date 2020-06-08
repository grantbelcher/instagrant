
const User = require('../db/models/User');
const Chat = require('../db/models/Chat');
const Message = require('../db/models/Message');


let connectedUsers = {};
let typingUsers = {};

const socketManager = (socket) => {
  // USER CONNECTS
  socket.on('USER_CONNECTED', (user) => {
    connectedUsers = addUser(connectedUsers, user);
    socket.broadcast.emit('NEW_USER_CONNECTED', connectedUsers);
    socket.emit('NEW_USER_CONNECTED', connectedUsers);
  });
  socket.on('DISCONNECTING', (user) => {
    connectedUsers = removeUser(connectedUsers, user);
    socket.broadcast.emit('USER_DISCONNECTED', connectedUsers);
  });

  socket.on('SENDING_MESSAGE', (message) => {
    const { user, text, chatId } = message;
    const newMessage = new Message({ username: user.name, text, chatId });
    console.log(newMessage, 'before');
    socket.broadcast.emit('MESSAGE_SENT', newMessage);
    socket.emit('MESSAGE_SENT', newMessage);
  });
};


function addUser(userList, user) {
  const newList = {
    ...userList,
  };
  newList[user.name] = user;
  return newList;
}

function removeUser(userList, user) {
  let newList = userList;
  if (newList[user.name]) {
    delete newList[user.name];
  }
  return newList;
}


module.exports = socketManager;
